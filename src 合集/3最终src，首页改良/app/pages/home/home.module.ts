import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NzMenuModule } from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/components/shared.module';
import { NzIconModule } from 'ng-zorro-antd';
import { LoginModalComponent } from './home/login-modal/login-modal.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { UserListComponent } from './user-manager/user-list/user-list.component';
import { UserModalComponent } from './user-manager/user-modal/user-modal.component';
import { CatelogListComponent } from './catelog-manager/catelog-list/catelog-list.component';
import { CatelogModalComponent } from './catelog-manager/catelog-modal/catelog-modal.component';
import { RoomModalComponent } from './room-manager/room-modal/room-modal.component';
import { RoomManagerListComponent } from './room-manager/room-manager-list/room-manager-list.component';
import { SubscribeListComponent } from './subscribe-manager/subscribe-list/subscribe-list.component';
import { SubscribeModalComponent } from './subscribe-manager/subscribe-modal/subscribe-modal.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { RigisterModalComponent } from './home/rigister-modal/rigister-modal.component';
import { MarqueeComponent } from './index/marquee/marquee.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { MySubscribeComponent } from './home/my-subscribe/my-subscribe.component';
import { PayModalComponent } from './room-list/pay-modal/pay-modal.component';
@NgModule({
  declarations: [HomeComponent, LoginModalComponent,IndexComponent, RoomListComponent, UserListComponent,
     UserModalComponent, CatelogListComponent, CatelogModalComponent,
     RoomModalComponent, RoomManagerListComponent, SubscribeListComponent,
     SubscribeModalComponent, ReservationModalComponent, RigisterModalComponent, MarqueeComponent, 
     ChangePasswordComponent, MySubscribeComponent, PayModalComponent,],
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    SharedModule,
    NzIconModule,
    RouterModule
  ],
  entryComponents:[LoginModalComponent,UserModalComponent, CatelogModalComponent,RoomModalComponent,SubscribeModalComponent,
    ReservationModalComponent,RigisterModalComponent,ChangePasswordComponent,PayModalComponent]
})
export class HomeModule { }
