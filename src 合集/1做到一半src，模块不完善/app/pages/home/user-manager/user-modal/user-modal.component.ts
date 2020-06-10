import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/interface/User';
import { UserService } from 'src/app/services/user.service';
import { throwError } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  form:FormGroup;
  @Input() item:User;
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,Validators.required],
      password:[null,Validators.required],
      phone:[null,Validators.required],
      role:['0',Validators.required],
    });
    console.log('item',this.item);
    if(this.item){
      for (const i in this.form.controls) {
        if (this.form.controls.hasOwnProperty(i)) {
          this.form.controls[i].setValue(this.item[i].toString());
        }
      }
    }
  }

  submit(isEdit:boolean){
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
    formData.append('phone', formValue.phone);
    formData.append('role',formValue.role);
      if(isEdit){
        return this.userService.updateUser(this.item.id,formData);
      } else {
        return this.userService.addUser(formData);
      }

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }


}
