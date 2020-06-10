import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/common/interface/room';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { convertTimeStamp } from 'src/app/common/utils';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  selectForm:FormGroup;
  dataList:Room[] = [];
  testArray = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
    private roomService:RoomService,
    private message:NzMessageService,
    private modalService:NzModalService,
    private authService:AuthService
  ) { }

  ngOnInit() {

    this.roomService.getAllRooms().subscribe(data=>{
      console.log('data',data);
    });

    this.selectForm = this.formBuilder.group({
      date:[null],
      minPrice:[null],
      maxPrice:[null]
    });
    this.fetchData();
    this.selectForm.get('date').valueChanges.subscribe(
      data=>{


            this.search();


      }
    );
  }
  fetchData(minPrice?:number,maxPrice?:number){
    this.activeRouter.paramMap.subscribe(
      (paramap:ParamMap)=>{

        this.search();

      }
    )
  }

  search(isClick:boolean = false){
    const minPrice = this.selectForm.get('minPrice').value;
    const maxPrice = this.selectForm.get('maxPrice').value;
    const date = this.selectForm.get('date').value;
    const id = this.activeRouter.snapshot.paramMap.get('id');
    let  byPrice = true;
    let byDate = true;
    let startTime;
    let endTime;
    const formData = new FormData();
    if(date && date.length){
      startTime = convertTimeStamp(date[0]);
      endTime = convertTimeStamp(date[1]);
      formData.append('startTime',startTime);
      formData.append('endTime',endTime);
    } else{
      byDate = false;
    }

    if(minPrice == null || maxPrice == null){
      isClick && this.message.error('输入的价格不能为空');
      byPrice = false;
    }
    if(minPrice>maxPrice){
      isClick && this.message.error('最低价不能大于最高价');
      byPrice = false;
      // return;
    }
    if(byPrice){
    formData.append('minPrice',minPrice);
    formData.append('maxPrice',maxPrice);
    }
    if(byPrice || byDate){
      this.roomService.getAllRoomsByPrice(Number(id),formData).subscribe(
        data=>{
          this.dataList = data;
        }
      )
    } else {
      this.roomService.getRoomsByCatelog(id).subscribe(data=>{
        this.dataList = data;
        console.log('this.dataList',this.dataList);
      });
    }


  }
  subscribe(item:Room){
    const date = this.selectForm.get('date').value;
    const self = this;
    const currentUser = this.authService.currentUser;
    if(!currentUser){
      this.message.info('请先完成登录或者注册');
      return;
    }
    if(date && date.length){
     const modal =  this.modalService.create({
        nzTitle:'预定信息',
        nzContent:ReservationModalComponent,
        nzComponentParams:{
          item:item,
          startTime:convertTimeStamp(date[0]),
          endTime:convertTimeStamp(date[1]),
        },
        nzFooter:[
        {
          label:'取消',
          onClick:()=> modal.destroy()
        },
        {
          label:'预定',
          type:'primary',
          onClick:(component)=> {
            component.submit().subscribe(
              data=>{
                this.message.success('预定成功');
                modal.destroy();
                self.search();
              },
              error=>{
                this.message.error(error.error.message);
              }
            );
          }
        }
      ]
      });
    } else{
      this.message.error('请先选择入住时间');
    }
  }

  clear(){
    this.selectForm.get('minPrice').setValue(null);
    this.selectForm.get('maxPrice').setValue(null);
    this.fetchData();
  }


}
