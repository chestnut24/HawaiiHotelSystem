import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interface/User';
import { UserService } from 'src/app/services/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService:UserService,
    private modalService:NzModalService,
    private messageService:NzMessageService
  ) { }
  tableData:User[] = [];
  ngOnInit() {
    this.getData();

  }

  getData(){
    this.userService.getUsers().subscribe(data=>{
      console.log('data',data);
      this.tableData = data;
    });
  }
  add(){
    this.createModal();
  }
  edit(user:User){
    this.createModal('修改',user,true);
  }
  delete(id:number){
    const self = this;
    const modal = this.modalService.confirm({
      nzTitle:'删除用户信息',
      nzContent: `删除信息删除后将不可恢复`,
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk:()=>{
        self.userService.deleteUser(id).subscribe(data=>{
          self.messageService.success(`删除成功`);
          self.getData();
        },error=>{
          console.error(error);
        })
      }
    });
  }

  createModal(title:string = '添加',item:User = null,isEdit:boolean = false){
  const self = this;
   const modal =  this.modalService.create({
      nzTitle: `${title}用户信息`,
      nzContent: UserModalComponent,
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
