import { Injectable } from '@angular/core';
import { localStorageKey } from '../common/types';
import { HttpClient } from '@angular/common/http';
import { API } from '../common/api';
import { Subject, Observable } from 'rxjs';
import { User } from '../common/interface/User';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  loginSubject = new Subject<boolean>();
  loginObservable = this.loginSubject.asObservable();
  userSubject = new Subject<User>();
  userObservable = this.userSubject.asObservable();

  set isLogin(login: boolean){
    const convertLogin = JSON.stringify(login);
    sessionStorage.setItem(localStorageKey.USER_INFO, convertLogin);
  }
  get isLogin(){
    const convertLogin = sessionStorage.getItem(localStorageKey.USER_INFO);
    return JSON.parse(convertLogin);
  }
  set isManager(isManager: boolean){
    const convertIsManager = JSON.stringify(isManager);
    sessionStorage.setItem(localStorageKey.IS_MANAGER, convertIsManager);
  }
  get isManager(){
    const convertIsManager = sessionStorage.getItem(localStorageKey.IS_MANAGER);
    return JSON.parse(convertIsManager);
  }


  set currentUser(user:User){
    const converUser = JSON.stringify(user);
    sessionStorage.setItem(localStorageKey.CURRENT_USER, converUser);
  }

  get currentUser(){
    const converUser = sessionStorage.getItem(localStorageKey.CURRENT_USER);
    return JSON.parse(converUser);
  }

  constructor(private http:HttpClient) { }

  loginIn(formData: FormData){
    return this.http.post<User>(API.LOGIN,formData).pipe( tap(
      ()=>{
        this.loginSubject.next(true);
      }
    ));
  }
}
