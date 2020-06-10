import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Type } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { errorResolver } from 'src/app/common/utils';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';

export interface ModalContentComponent<T> {
  item?: T;
  args?:any[];
  form: FormGroup;
  submit(...args: any[]): Observable<any>;
}
type WithCheckFlag<T> = T & {
    checked: boolean
};

export  abstract class CommonCurdListComponent<T> {
  loading = true;
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    data = new Array<WithCheckFlag<T>>();
    searchInput = new FormControl('');
    searchText: string = '';
    modalWidth: number;
    modal:NzModalRef;
    get allChecked(): boolean {
      return this.data.every(value => value.checked === true);
  }
  set allChecked(checked: boolean) {
      this.data.forEach(value => value.checked = checked);
  }
  get indeterminate(): boolean {
    const allChecked = this.data.every(value => value.checked === true);
    const allUnChecked = this.data.every(value => !value.checked);
    return (!allChecked) && (!allUnChecked);
}

get checkedCount(): number {
    return this.data.reduce((count, item) => {
        return item.checked ? ++count : count;
    }, 0);
}
  private modalName: string;
  private modalContentComponent: Type<ModalContentComponent<T>>;
  protected abstract message: NzMessageService;
  protected abstract modalService: NzModalService;
  constructor() {
    this.searchInput.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
  ).subscribe(text => {

  });
  }
  initTable(modalName: string, modalContentComponent: Type<ModalContentComponent<T>>, modalWidth?: number) {
    this.modalContentComponent = modalContentComponent;
    this.modalName = modalName;
    this.modalWidth = modalWidth;
    // this.fetchData(true);
}
  currentPageDataChange($event) { }

  checkAll(value: boolean): void {
      this.data.forEach(data => data.checked = value);
  }

  // fetchData(reset: boolean = false, callback?: (data: WithCheckFlag<T>[]) => void) {
  //   if (reset) {
  //       this.pageIndex = 1;
  //   }
  //   this.loading = true;
  //   this.getData(this.pageIndex - 1, this.pageSize, this.searchText).pipe(
  //       flatMap((data) => {
  //           if (data.numberOfElements == 0 && data.totalPages > 0) {
  //               return this.getData(data.totalPages - 1, this.pageSize, this.searchText);
  //           } else {
  //               return of(data);
  //           }
  //       })
  //   ).subscribe((data) => {
  //       this.loading = false;
  //       this.total = data.totalElements;
  //       this.data = data.content.map(item => {
  //           return Object.assign(item, { checked: false });
  //       });
  //       if (callback) callback(this.data);
  //   }, (error) => {
  //       this.loading = false;
  //       console.error(error);
  //       this.message.error(errorResolver(error));
  //   }, () => {
  //       this.loading = false;
  //   });
  // }

  add(...args: any[]) {
    this.createModal('添加', undefined, ...args);
  }

  edit(item: T, ...args: any[]) {
    this.createModal('修改', item, ...args);
}

createModal(type: string, item?: T, ...args: any[]) {
  const self = this;
  this.modal = this.modalService.create({
      nzTitle: `${type}${this.modalName}`,
      nzContent: this.modalContentComponent,
      nzComponentParams: { item , args},
      nzMaskClosable: false,
      nzWidth: self.modalWidth || 520,
      nzFooter: [{
          label: '取消',
          type: 'default',
          onClick(componentInstance): void {
              self.modal.destroy();
              self.modal = null;
          }
      }, {
          label: '确定',
          type: 'primary',

          loading: false,
          disabled:(componentInstance) => {
              return !componentInstance.form.dirty;
          },
          onClick(componentInstance): void {
              this.loading = true;
              componentInstance.submit(...args).subscribe(() => {
                  this.loading = false;
                  self.modal.destroy();
                  self.modal = null;
                  self.message.success(`${type}成功`);
                  // self.fetchData();
              }, (error) => {
                  this.loading = false;
                  if (error !== FORM_INVALID_ERROR) {
                      self.modalService.error({
                          nzTitle: `${type}${self.modalName}失败`,
                          nzContent: errorResolver(error)
                      });
                  }
              });
          }
      }]
  });
}
abstract deleteItem(item: T): Observable<any>;

delete(item: T) {
    this.createDeleteConfirmModal(this.deleteItem(item), `删除 ${this.modalName}信息`);
}

private createDeleteConfirmModal(ob: Observable<any>, title?: string) {
  this.modal = this.modalService.confirm({
      nzTitle: title || `删除${this.modalName}信息`,
      nzContent: `${this.modalName}信息删除后将不可恢复`,
      nzOkText: '删除',
      nzCancelText: '取消',
      // nzOkLoading:false,
      nzOnOk: () => {
          this.modal = null;
          return new Promise((resolve, reject) => {
              ob.subscribe(() => {
                  resolve();
                  this.message.success('删除成功');
                  // this.fetchData();
              }, (error) => {
                  reject();
                  // this.message.error('删除失败');
                  this.modalService.error({
                      nzTitle: '删除失败',
                      nzContent: errorResolver(error)
                  });
              });
          });
      }
  });
}
}
