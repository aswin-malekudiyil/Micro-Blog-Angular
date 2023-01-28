/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/quotes */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title: any;
  blogcontent: any;
  previewurl: any;
  bolgFileUrl: any;
  constructor(private apiService: ApiService, private navCtrl: NavController, private router: Router,
    private storage: AngularFireStorage, private loadingCtrl: LoadingController, private alertController: AlertController) {}



  handleClear(){
    this.title = '';
    this.blogcontent = '';
  }

  //image portion
  uploadFile(event){
    const file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.previewurl = reader.result;
      };

    /*const filePath = 'upload/'+file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(res =>{
      alert('uploaded successfully');
      ref.getDownloadURL().subscribe(urld=>{
        console.log(urld);
        //this.previewurl = urld;
      });
    }).catch(e =>{
      console.log(e);
    });*/
  }

  //Alert function

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //alert function ends

 async sendBlog(){
    const loading = await this.loadingCtrl.create({
    });
    loading.present();
    const blogFile = (<HTMLInputElement>document.getElementById('file-input')).files[0];
    if(blogFile){
      const date = new Date();
      const filePath = 'upload/'+blogFile.name+ date.getTime();
    const ref = this.storage.ref(filePath);
    const task = ref.put(blogFile).then(res =>{
      //alert('uploaded successfully');
      ref.getDownloadURL().subscribe(urld=>{
      console.log(urld);
      this.bolgFileUrl= urld;

      //blog uploading start
      const blog = {
        blogUserid: localStorage.getItem('uid'),
        blogtitle: this.title,
        blogcontent:this.blogcontent,
        blogfile: this.bolgFileUrl,
      };
      this.apiService.uploadBlog(blog).subscribe(resblog => {
        loading.dismiss();
        this.presentAlert('Blog Uploaded');
        console.log(resblog);
        this.handleClear();
        this.router.navigateByUrl('/tabs');
      });
      });
    }).catch(e =>{
      console.log(e);
    });
    }
    else{
      const loading2 = await this.loadingCtrl.create({
      });
      loading.present();
      const blog = {
        blogUserid: localStorage.getItem('uid'),
        blogtitle: this.title,
        blogcontent:this.blogcontent,
        blogfile: this.bolgFileUrl,
      };
      this.apiService.uploadBlog(blog).subscribe(resblog => {
        loading.dismiss();
        this.presentAlert('Blog Uploaded');
        console.log(resblog);
        this.handleClear();
        this.router.navigateByUrl('/tabs');
      });
    }

  }

}
