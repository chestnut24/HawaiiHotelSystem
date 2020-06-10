import { Component, OnInit } from '@angular/core';
import { MySubscribe } from 'src/app/common/interface/MySubscribe';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { MySubscribeService } from 'src/app/services/my-subscrible.service';

@Component({
  selector: 'app-subscribe-list',
  templateUrl: './subscribe-list.component.html',
  styleUrls: ['./subscribe-list.component.scss']
})
export class SubscribeListComponent implements OnInit {

  constructor(
    private mySubscribeService:MySubscribeService,
    private modalService:NzModalService,
    private messageService:NzMessageService
  ) { }
  tableData:MySubscribe[] = [];
  ngOnInit() {
    this.getData();

  }

  getData(){
    this.mySubscribeService.getAllSubscribe().subscribe(data=>{
      console.log('data',data);
      this.tableData = data;
    });
  }

  confirm(id:number){
    this.refresh(id,'1');
  }

  reject(id:number){
    this.refresh(id,'2');
  }

  refresh(id:number,status:string){
    const formData = new FormData();
    formData.append('status', status);
    this.mySubscribeService.refreshStatus(id,formData).subscribe(data=>{
      this.messageService.success('处理成功');
      this.getData();
    },
    error=>{
      this.messageService.error(error.error.message);
    }
    );
  }
  // add(){
  //   this.createModal();
  // }
  // edit(user:MySubscribe){
  //   this.createModal('修改',user,true);
  // }
  // delete(id:number){
  //   const self = this;
  //   const modal = this.modalService.confirm({
  //     nzTitle:'删除用户信息',
  //     nzContent: `删除信息删除后将不可恢复`,
  //     nzOkText: '删除',
  //     nzCancelText: '取消',
  //     nzOnOk:()=>{
  //       self.roomService.deleteRoomById(id).subscribe(data=>{
  //         self.messageService.success(`删除成功`);
  //         self.getData();
  //       },error=>{
  //         console.error(error);
  //       })
  //     }
  //   });
  // }

  // createModal(title:string = '添加',item:Room = null,isEdit:boolean = false){
  // const self = this;
  //  const modal =  this.modalService.create({
  //     nzTitle: `${title}用户信息`,
  //     nzContent: RoomModalComponent,
  //     nzComponentParams:{
  //       item:item
  //     },
  //     nzFooter:[
  //       {
  //         label:'取消',
  //         onClick: ()=>{
  //           modal.destroy();
  //         }
  //       },
  //       {
  //         label:'确定',
  //         type:'primary',
  //         onClick:(component)=>{
  //           component.submit(isEdit).subscribe(
  //             data=>{
  //               self.messageService.success(`${title}成功`);
  //               modal.destroy();
  //               self.getData();
  //             },
  //             error=>{
  //               self.messageService.error(error.error.message);
  //             }
  //           );
  //         }
  //       }

  //     ]
  //   });
  // }
}
