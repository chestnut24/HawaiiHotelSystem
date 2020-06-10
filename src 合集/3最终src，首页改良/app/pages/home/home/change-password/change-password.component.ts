import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private userService:UserService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.form = this.formbuilder.group({
      oldPassword:[null,Validators.required],
      newPassword:[null,Validators.required],
      confirmPassword:[null,[Validators.required, this.confirmationValidator]]
    })
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submit(){
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i) && i !== 'name') {
          this.form.controls[i].markAsDirty();
          this.form.controls[i].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
    const formValue = this.form.value;
    const formData = new FormData();
    formData.append('id',this.authService.currentUser.id.toString());
    formData.append('oldPassword', formValue.oldPassword);
    formData.append('newPassword',formValue.newPassword);
    return this.userService.changePassword(formData);

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }

}
