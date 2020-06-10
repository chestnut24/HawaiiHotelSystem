import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/common/interface/room';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { MySubscribeService } from 'src/app/services/my-subscrible.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {
  form:FormGroup;
  @Input()item:Room;
  @Input() startTime:number;
  @Input() endTime:number;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private subscribeService:MySubscribeService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName:[this.authService.currentUser.name],
      roomNumber:[this.item.room_number],
      price:[this.item.money],
      startedTime:[new DatePipe('zh-CN').transform(this.startTime,'yyyy-MM-dd')],
      endedTime:[new DatePipe('zh-CN').transform(this.endTime,'yyyy-MM-dd')]
    });
  }

  submit(){
    const formData = new FormData();
    formData.append('userId',this.authService.currentUser.id.toString());
    formData.append('roomId',this.item.id.toString());
    formData.append('startTime',this.startTime.toString());
    formData.append('endTime',this.endTime.toString());
    return this.subscribeService.addSubscribe(formData);
  }
}
