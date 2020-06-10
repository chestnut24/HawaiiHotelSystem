import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private messageService:NzMessageService,
    private router:Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): boolean {
      const user = this.authService.currentUser;
      if(user && user.role){
        return true;
      } else{
        this.messageService.error('您无权访问该页面，已为您重新导航到首页！');
        this.router.navigate(['home/']);
        return false;
      }
  }
}
