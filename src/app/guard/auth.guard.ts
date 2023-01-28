import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginPage } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private navCtrl: NavController){}
  canLoad(){
   const authCheck = !!localStorage.getItem('uid');
   if(authCheck){
    console.log('true area');
    return true;
   }
   else{
    console.log('false area');
    this.router.navigateByUrl('/login');
    return true;
   }
  }
}
