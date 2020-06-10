import { Component, OnInit } from '@angular/core';
import { Catelog } from 'src/app/common/interface/Catelog';
import { CatelogService } from 'src/app/services/catelog.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { CatelogModalComponent } from '../catelog-modal/catelog-modal.component';

@Component({
  selector: 'app-catelog-list',
  templateUrl: './catelog-list.component.html',
  styleUrls: ['./catelog-list.component.scss']
})
export class CatelogListComponent implements OnInit {

  constructor(
    private catelogService:CatelogService,
    private modalService:NzModalService,
    private messageService:NzMessageService
  ) { }
  tableData:Catelog[] = [];
  ngOnInit() {
    this.getData();

  }

  getData(){
    this.catelogService.getAllCatelogs().subscribe(data=>{
      console.log('data',data);
      this.tableData = data;
    });
  }
  add(){
    this.createModal();
  }
  edit(user:Catelog){
    this.createModal('修改',user,true);
  }
  delete(id:number){
    const self = this;
    const modal = this.modalService.confirm({
      nzTitle:'删除类别信息',
      nzContent: `删除信息删除后将不可恢复`,
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk:()=>{
        self.catelogService.deletCatelog(id).subscribe(data=>{
          self.messageService.success(`删除成功`);
          self.getData();
        },error=>{
          console.error(error);
        })
      }
    });
  }

  createModal(title:string = '添加',item:Catelog = null,isEdit:boolean = false){
  const self = this;
   const modal =  this.modalService.create({
      nzTitle: `${title}类型信息`,
      nzContent: CatelogModalComponent,
      nzComponentParams:{
        item:item
      },
      nzFooter:[
        {
          label:'取消',
          onClick: ()=>{
            modal.destroy();
          }
        },
        {
          label:'确定',
          type:'primary',
          onClick:(component)=>{
            component.submit(isEdit).subscribe(
              data=>{
                self.messageService.success(`${title}成功`);
                modal.destroy();
                self.getData();
              },
              error=>{
                self.messageService.error(error.error.message);
              }
            );
          }
        }

      ]
    });
  }
}
