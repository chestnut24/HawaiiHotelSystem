import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Room } from 'src/app/common/interface/room';
import { RoomService } from 'src/app/services/room.service';
import { CatelogService } from 'src/app/services/catelog.service';
import { Catelog } from 'src/app/common/interface/Catelog';
import { NzMessageService } from 'ng-zorro-antd';
import { throwError, of } from 'rxjs';
import { FORM_INVALID_ERROR } from 'src/app/components/shared.module';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss']
})
export class RoomModalComponent implements OnInit {
  form:FormGroup;
  selectOptions: Catelog[] = [];
  upload = false;
  @Input() item:Room;
  fileList = new Array<File>();
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private catelogService:CatelogService,
    private message:NzMessageService
  ) { }

  ngOnInit() {
    console.log('item',this.item);

    this.form = this.formBuilder.group({
      room_number:[null,Validators.required],
      area:[null,Validators.required],
      money:[null,Validators.required],
      catelog_id:[null,Validators.required],
      remark:[null]
    });
    this.item?
    this.form.addControl('image_url',new FormControl(null)):
    this.form.addControl('image_url',new FormControl(null,Validators.required));
    this.catelogService.getAllCatelogs().subscribe(
      data =>{
        console.log('aaa');
        this.selectOptions = data;
        console.log('data',data);
        console.log('data',data);
        if(this.item){
          console.log('bbb');
          for (const i in this.form.controls) {
            if (this.form.controls.hasOwnProperty(i) && this.item[i] !== 'null' && i !== 'image_url') {
              this.form.controls[i].setValue(this.item[i].toString());
            }
          }
        }
      }
    );
    console.log('item',this.item);

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
    formData.append('area', formValue.area);
    formData.append('catelogId', formValue.catelog_id);
    formData.append('roomNumber', formValue.room_number);
    this.upload && formData.append('file',formValue.image_url);
    this.item && formData.append('imageUrl',this.item.image_url);
    formData.append('remark', formValue.remark);
    formData.append('money', formValue.money);
      if(isEdit){
        return this.roomService.updateRoom(this.item.id,formData);
      } else {
        return this.roomService.addRoom(formData);
      }

    } else {
    return throwError(FORM_INVALID_ERROR);
    }
  }
  beforeUpload = (file: File): boolean => {
    const isValid = this.isSpectrumFileValid(file);
    if(!isValid){
        this.message.error('上传文件格式错误,支持的文件包括:.xls,.csv,.xlsx');
        this.fileList = [];
        this.form.get('image_url').setValue(null);
        this.form.get('image_url').markAsPristine();
    } else {
      this.upload = true;
        this.fileList = [file];
        this.form.get('image_url').setValue(file);
        this.form.get('image_url').markAsDirty();
    }
    return false;
}
fileListChange(file:File[]){
    this.fileList = file;
    if(file.length > 0){
      this.upload = true;
        this.form.get('image_urle').setValue(file[0]);
        this.form.get('image_url').markAsDirty();
    } else {
        this.upload = false;
        this.form.get('image_url').setValue(null);
        this.form.get('image_url').markAsPristine();
    }
}

  isSpectrumFileValid(file: File):boolean{
    const name = file.name;
    const isValid = name.endsWith('jpg') || name.endsWith('png');
    return isValid;
}
}
