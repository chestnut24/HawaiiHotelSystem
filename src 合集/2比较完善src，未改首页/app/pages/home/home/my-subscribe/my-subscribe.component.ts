import { Component, OnInit } from '@angular/core';
import { MySubscribeService } from 'src/app/services/my-subscrible.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { MySubscribe } from 'src/app/common/interface/MySubscribe';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-subscribe',
  templateUrl: './my-subscribe.component.html',
  styleUrls: ['./my-subscribe.component.scss']
})
export class MySubscribeComponent implements OnInit {
  constructor(
    private mySubscribeService:MySubscribeService,
    private modalService:NzModalService,
    private messageService:NzMessageService,
    private authService:AuthService
  ) { }
  tableData:MySubscribe[] = [];
  ngOnInit() {
    this.getData();

  }

  getData(){
    const user = this.authService.currentUser;
    
    this.mySubscribeService.getSubscribeById(user.id).subscribe(data=>{
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
}
