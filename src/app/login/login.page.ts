/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VerifyPage } from '../verify/verify.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  verified: any;
  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController,
    private router: Router, private modalCtrl: ModalController, private loadCtrl: LoadingController) {

     }

  ngOnInit() {
  }

  navSignup(){
    this.navCtrl.navigateForward('signup');
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async signIn(){
      //this.checkUser();
      //this.isVerified();
      const loading = this.loadCtrl.create({
      });
      (await loading).present();
      //console.log((await this.afAuth.currentUser).emailVerified);
      if((await this.afAuth.currentUser).emailVerified){
      const res = await this.afAuth.signInWithEmailAndPassword(this.email,this.password);
      (await loading).dismiss();
      if(res.user){
        this.email = '';
        this.password = '';
          this.presentAlert('login done');
          console.log(res.user);
          localStorage.setItem('uid', res.user.uid);
          this.router.navigateByUrl('/');
        }else{
          alert('error');
          console.error();
        }
    }
    else{
      this.email = '';
      this.password = '';
      this.modalCtrl.create({
        component: VerifyPage
      }).then(res=>{
        res.present();
      });
      this.presentAlert('Seems Like You Have Not Verified Email. Please Verify Before You Sign In');
    }
  }

  async isVerified(){
    this.verified = (await this.afAuth.currentUser).emailVerified;
  console.log(this.verified);
  }
}
