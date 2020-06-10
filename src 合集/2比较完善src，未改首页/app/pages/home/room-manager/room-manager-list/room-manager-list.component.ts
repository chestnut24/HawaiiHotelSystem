import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Room } from 'src/app/common/interface/room';
import { RoomModalComponent } from '../room-modal/room-modal.component';

@Component({
  selector: 'app-room-manager-list',
  templateUrl: './room-manager-list.component.html',
  styleUrls: ['./room-manager-list.component.scss']
})
export class RoomManagerListComponent implements OnInit {

  constructor(
    private roomService:RoomService,
    private modalService:NzModalService,
    private messageService:NzMessageService
  ) { }
  tableData:Room[] = [];
  ngOnInit() {
    this.getData();

  }

  getData(){
    this.roomService.getAllRooms().subscribe(data=>{
      console.log('data',data);
      this.tableData = data;
    });
  }
  add(){
    this.createModal();
  }
  edit(user:Room){
    this.createModal('修改',user,true);
  }
  delete(id:number){
    const self = this;
    const modal = this.modalService.confirm({
      nzTitle:'删除房间信息',
      nzContent: `删除信息删除后将不可恢复`,
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk:()=>{
        self.roomService.deleteRoomById(id).subscribe(data=>{
          self.messageService.success(`删除成功`);
          self.getData();
        },error=>{
          console.error(error);
        })
      }
    });
  }

  createModal(title:string = '添加',item:Room = null,isEdit:boolean = false){
  const self = this;
   const modal =  this.modalService.create({
      nzTitle: `${title}房间信息`,
      nzContent: RoomModalComponent,
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
