import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { VerifyPage } from '../verify/verify.page';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: any;
  password: any;
  name: any;
  res: any;
  constructor(private navctrl: NavController, private afAuth: AngularFireAuth, private apiservice: ApiService,
    private alertCtrl: AlertController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Please Login To Continue',
      buttons: ['OK'],
    });
    await alert.present();
  }

  navLogin(){
    this.navctrl.navigateForward('login');
  }

  async signUp(){
    this.res = await this.afAuth.createUserWithEmailAndPassword(this.email,this.password);
    console.log(this.res);
    await this.res.user.sendEmailVerification();
    const useradd = {
      id: this.res.user.uid,
      username: this.name,
      email: this.email,
      isEnabled: 1
    };
    this.apiservice.addUser(useradd).subscribe(resadd=>{
      alert('user enterd in db spring boot');
      console.log(resadd);
      this.email = '';
      this.password = '';
      this.name = '';
      this.presentAlert();
      this.modalCtrl.create({
        component: VerifyPage
      }).then(modalres => {
        modalres.present();
      });
    });
  }
}
