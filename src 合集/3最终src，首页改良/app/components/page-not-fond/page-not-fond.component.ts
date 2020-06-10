import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-page-not-fond',
  templateUrl: './page-not-fond.component.html',
  styleUrls: ['./page-not-fond.component.scss']
})
export class PageNotFondComponent implements OnInit {

  url:string;
  constructor(
    private router:Router,
    private message:NzMessageService
    ) {
      this.message.error('您访问的页面不存在，系统将为您重新导航到首页');
      this.url = this.router.url;

      setTimeout(()=>{
        this.router.navigate(['home/']);
      },2000);
   }

  ngOnInit() {
  }

}
