import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catelog } from '../common/interface/Catelog';
import { API } from '../common/api';

@Injectable()
export class CatelogService {

  constructor(
    private http:HttpClient
  ) { }

  getAllCatelogs(){
    return this.http.get<Catelog[]>(API.CATELOGS);
  }

  addCateLog(formData:FormData){
    return this.http.post(API.ADDCATELOG,formData);
  }
  updateCatelog(id:number,formData:FormData){
    return this.http.post(API.UPDATECATELOG+'/' + id,formData);
  }
  deletCatelog(id:number){
    return this.http.delete(API.CATELOG + '/' + id);
  }
}
