import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MySubscribe } from '../common/interface/MySubscribe';
import { API } from '../common/api';

@Injectable()
export class MySubscribeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSubscribe(){
   return this.http.get<MySubscribe[]>(API.SUBSCRIBES);
  }

  refreshStatus(id:number, formData:FormData){
    return this.http.post(API.REFRESH_STATUS+'/'+id,formData);
  }

  addSubscribe(formData:FormData){
    return this.http.post(API.ADD_SUBSCRIBE,formData);
  }
}
