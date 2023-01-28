import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: any;
  userblogs: any;
  constructor(private apiService: ApiService, private router: Router) {}

  getUserInfo(){
    const userid = localStorage.getItem('uid');
    this.apiService.getProfile(userid).subscribe(res => {
      console.log(res);
      this.user = res;
      this.apiService.getBlogByUser(userid).subscribe(blogres=>{
        this.userblogs = blogres;
      });
    });
  }

  logout(){
    localStorage.removeItem('uid');
    this.router.navigateByUrl('/login');
  }

  ngOnInit(){
    this.getUserInfo();
  }
}
