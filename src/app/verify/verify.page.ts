import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginNav(){
    window.location.reload();
  }

}
