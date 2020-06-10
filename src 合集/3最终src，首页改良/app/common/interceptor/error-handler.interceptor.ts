/*
 * File Created: Friday, 7th September 2018 1:49:06 pm
 * Author: zhsh
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private message:NzMessageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error)=>{
                let errorMsg:string;
                if(error instanceof HttpErrorResponse){
                    if(!(error.error && error.error.errorCode))
                        this.message.error(error.message);
                    if (typeof error.error === 'object') {
                        errorMsg = error.error.message;
                    } else {
                        errorMsg = error.error;
                    }
                }else{
                    errorMsg = JSON.stringify(error);
                    this.message.error(errorMsg);
                }
                return throwError(error);
            })
        );
    }
}
