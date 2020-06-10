import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RigisterModalComponent } from '../rigister-modal/rigister-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  form:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService:NzModalService,
    private messageService:NzMessageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,Validators.required],
      password:[null,Validators.required]
    });
  }

    submit(){
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
          this.form.controls[i].markAsDirty();
          this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
    const formValue = this.form.value;
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('password', formValue.password);
    return this.authService.loginIn(formData);

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }

  register(){
    this.modalService.closeAll();
    const self = this;
    const  modal = this.modalService.create({
      nzTitle:'注册',
      nzContent:RigisterModalComponent,
      nzMaskClosable:false,
      nzFooter:[
      {
        label:'取消',
        onClick:()=> modal.destroy()
      },
      {
        label:'注册',
        type:'primary',
        onClick:(component)=>{
          component.submit().subscribe(
            ([data,name,password])=>{
              const formData = new FormData();
              formData.append('name', name);
              formData.append('password', password);
              this.authService.loginIn(formData).subscribe(
                data =>{
                  self.authService.currentUser = data;
                  self.authService.isLogin = true;
                  self.authService.loginSubject.next(true);
                  self.authService.userSubject.next(data);
                  self.messageService.success('注册成功,已为您自动登录');
                },
                error=>{
                  this.messageService.error(error.error.message);
                }
              );
              console.log('data',data);

              modal.destroy();
            },
            error=>{
              this.messageService.error(error.error.message);
            }
          )
        }
      }
    ]
    });
  }
}
