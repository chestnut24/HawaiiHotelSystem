// /*
//  * File Created: Thursday, 6th September 2018 2:09:06 pm
//  * Author: zhsh
//  */
// import { Injectable, Injector } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// import { token } from '../../common/types';
// import { AuthService } from '../../services/auth.service';
// import { API } from '../api';
// import { JoinCloudService } from '../../services/joincloud.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     private FILTERED_URLS = [API.LOGIN, API.REFRESH_TOKEN, API.PUBLIC_LOGIN,API.ACTIVE_SYSTEM,API.ACTIVE_VERIFY,API.REGISTER_MESSAGE];
//     constructor(private injector: Injector) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let auth:Observable<string>;
//         let url:string;
//         if(req.url.startsWith(JoinCloudService.HOST_URL)){
//             auth = this.injector.get(JoinCloudService).getAccessToken();
//             url = req.url.substring(JoinCloudService.HOST_URL.length);
//         }else{
//             auth = this.injector.get(AuthService).getAccessToken();
//             url = req.url;
//         }
//         if (this.FILTERED_URLS.some((api)=>url.startsWith(api))) {
//             return next.handle(req);
//         } else {
//             return auth.pipe(switchMap(_token => {
//                 const authHeader = token.HEADER_PREFIX + _token;
//                 const authReq = req.clone({ headers: req.headers.set(token.JWT_TOKEN_HEADER_PARAM, authHeader) });
//                 return next.handle(authReq);
//             }));
//         }
//     }
// }
