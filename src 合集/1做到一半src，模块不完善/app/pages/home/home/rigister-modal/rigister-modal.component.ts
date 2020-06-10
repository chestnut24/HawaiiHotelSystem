import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { throwError, forkJoin, of, Observable, Observer } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-rigister-modal',
  templateUrl: './rigister-modal.component.html',
  styleUrls: ['./rigister-modal.component.scss']
})
export class RigisterModalComponent implements OnInit {
  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,[Validators.required],[this.userNameAsyncValidator]],
      password:[null,[Validators.required]],
      checkPassword:[null,[Validators.required,this.confirmationValidator]],
      phone:[null,[Validators.required,this.confirmPhoneValidator]]
    })
  }


  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  userNameAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    control.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        this.userService.confirmUserName(value).subscribe(
          data=>{
            if(!data){
              observer.next({ error: true, duplicated: true });
            } else {
              observer.next(null);
            }
            observer.complete();
          }
        );
      }
    )
  });

  confirmPhoneValidator = (control: FormControl): { [s: string]: boolean } => {
    const regex = /^1(3|4|5|7|8)\d{9}$/;
    if (!control.value) {
      return { required: true };
    } else if (!regex.test(control.value) ) {
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
    formData.append('name', formValue.name);
    formData.append('password', formValue.password);
    formData.append('phone',formValue.phone);
    return forkJoin([this.userService.addUser(formData),of(formValue.name),of(formValue.password)]);

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }
}
