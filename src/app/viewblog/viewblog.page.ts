import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.page.html',
  styleUrls: ['./viewblog.page.scss'],
})
export class ViewblogPage implements OnInit {

  blog: any;
  blogid: any;
  constructor(private activatedroute: ActivatedRoute, private apiservice: ApiService, private router: Router,
    private modalCtrl: ModalController, private navParams: NavParams) {

   const blogData = this.navParams.data;
   this.blogid = blogData.blogDataId;
   this.getBlog(this.blogid);
   }

  ngOnInit() {
  }

  getBlog(id){
    //const blogid = this.activatedroute.snapshot.paramMap.get('id');
    this.apiservice.getBlog(id).subscribe(res =>{
      this.blog = res;
      console.log(res);
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }
}
