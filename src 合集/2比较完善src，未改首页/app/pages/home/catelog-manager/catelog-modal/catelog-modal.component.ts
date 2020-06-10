import { Component, OnInit, Input } from '@angular/core';
import { Catelog } from 'src/app/common/interface/Catelog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatelogService } from 'src/app/services/catelog.service';
import { throwError } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';

@Component({
  selector: 'app-catelog-modal',
  templateUrl: './catelog-modal.component.html',
  styleUrls: ['./catelog-modal.component.scss']
})
export class CatelogModalComponent implements OnInit {
  form:FormGroup;
  @Input() item:Catelog;
  constructor(
    private formBuilder: FormBuilder,
    private catelogService: CatelogService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,Validators.required],

    });
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
      if(isEdit){
        return this.catelogService.updateCatelog(this.item.id,formData);
      } else {
        return this.catelogService.addCateLog(formData);
      }

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }
}
