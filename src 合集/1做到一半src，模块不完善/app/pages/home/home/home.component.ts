import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { errorResolver } from 'src/app/common/utils';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';
import { User } from 'src/app/common/interface/User';
import { localStorageKey } from 'src/app/common/types';
import { CatelogService } from 'src/app/services/catelog.service';
import { Catelog } from 'src/app/common/interface/Catelog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin: boolean;
  currentUser:User;
  catelogs:Catelog[] = [];
  isManager = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NzModalService,
    private messageService:NzMessageService,
    private catelogService: CatelogService,
    private router:Router
  ) { }

  ngOnInit() {
    this.isLogin = this.authService.isLogin;
    this.currentUser = this.authService.currentUser;
    this.isManager = this.authService.isManager;
    this.authService.loginObservable.subscribe(
      data=>{
        this.isLogin = data;
      }
    );
    this.authService.userObservable.subscribe(user=>{
      this.currentUser = user;
    })
    console.log('this.currentUser',this.currentUser);
    this.catelogService.getAllCatelogs().subscribe(data=>{
      console.log('data',data);
      this.catelogs = data;
    });

  }
  test(){
    this.userService.getUsers().subscribe();
  }

  login(){
    const self = this;
    const  modal = this.modalService.create({
      nzTitle:'登录',
      nzContent:LoginModalComponent,
      nzMaskClosable:false,
      nzFooter:[
        {
          label:'取消',
          onClick:()=> modal.destroy()
        },
        {
          label:'登录',
          type:'primary',
          loading: false,
          onClick: (component)=>{
            component.submit().subscribe(
              data=>{
                console.log('data',data);
                self.authService.currentUser = data;
                self.currentUser = data;
                self.isLogin = true;
                self.authService.isLogin = true;
                modal.destroy();
                this.messageService.success('登录成功');
              },
              error=>{
                if (error !== FORM_INVALID_ERROR) {
                  console.log(error);
                  this.messageService.error(error.error.message);
              }
              }
            );
          }
        }
      ]
    });
  }
  loginOut(){
    [localStorageKey.CURRENT_USER,localStorageKey.USER_INFO,localStorageKey.IS_MANAGER].forEach(
      item =>{
        sessionStorage.removeItem(item);
      }
    );

      this.isManager = false;
      this.isLogin =false;
      this.currentUser = null;
      this.router.navigate(['home/']);
  }
  entryManager(){
    this.isManager = true;
    this.authService.isManager = true;
    this.router.navigate(['home/user-list']);
  }
  leaveManager(){
    this.isManager = false;
    this.authService.isManager = false;
    this.router.navigate(['home/']);
  }
}
