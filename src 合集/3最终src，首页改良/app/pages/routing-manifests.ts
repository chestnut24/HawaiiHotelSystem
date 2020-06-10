import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { IndexComponent } from './home/index/index.component';
import { RoomListComponent } from './home/room-list/room-list.component';
import { UserListComponent } from './home/user-manager/user-list/user-list.component';
import { CatelogListComponent } from './home/catelog-manager/catelog-list/catelog-list.component';
import { RoomManagerListComponent } from './home/room-manager/room-manager-list/room-manager-list.component';
import { SubscribeListComponent } from './home/subscribe-manager/subscribe-list/subscribe-list.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';
import { MySubscribeComponent } from './home/home/my-subscribe/my-subscribe.component';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children:[
          {
            path:'',
            redirectTo:'index',
            pathMatch: 'full'
          },
          {
            path:'index',
            component:IndexComponent
          },
          {
            path:'catelog/:id',
            component:RoomListComponent
          },{
            path:'user-list',
            component:UserListComponent,
            canActivate:[AuthGuardGuard]
          },
          {
            path:'catelog-list',
            component:CatelogListComponent,
            canActivate:[AuthGuardGuard]
          },
          {
            path:'room-list',
            component:RoomManagerListComponent,
            canActivate:[AuthGuardGuard]
          },{
            path:'subscribe-list',
            component:SubscribeListComponent,
            canActivate:[AuthGuardGuard]
          },{
            path:'my-subscribe',
            component:MySubscribeComponent
          }
        ]

    },


];

export const MOBILE_ROUTES: Routes = [
];

export const PASSPORT_ROUTES: Routes = [

];
