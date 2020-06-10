import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  isManager = false;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }
  returnMain() {
    this.isManager = false;
    this.authService.isManager = false;
    this.router.navigate(['home/']);
  }

}
