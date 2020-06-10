import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API } from '../common/api';
import { User } from '../common/interface/User';
@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get<User[]>(API.USERS);
  }

  addUser(formData:FormData){
    return this.http.post(API.ADD_USER,formData);
  }

  deleteUser(id:number){
    return this.http.delete(API.USER + '/' +id);
  }

  updateUser(id:number,formData:FormData){
    return this.http.post(API.UPDATE_USER + '/' + id,formData);
  }

  confirmUserName(name:string){
    return this.http.get<boolean>(API.CONFIRM_USER + '/' +name);
  }
}
