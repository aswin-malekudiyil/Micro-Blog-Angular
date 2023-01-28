import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ViewblogPage } from '../viewblog/viewblog.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  blogs: any;
  rvrsdblog: any;
  constructor(private apiservice: ApiService, private loadCtrl: LoadingController, private router: Router,
    private modalCtrl: ModalController) {}

  async loadBlog(){
    const loading = await this.loadCtrl.create({
    });

    this.apiservice.loadBlogs().subscribe(res => {
      this.blogs = res;
      console.log(res);
      this.rvrsdblog = this.blogs.slice().reverse();
    });
  }
  ngOnInit(){
    this.loadBlog();
    this.apiservice.Refreshrequired.subscribe(response=>{
      this.loadBlog();
    });
   }

   blogId(blogid){
    //alert(blogid);
    this.router.navigateByUrl('tabs/viewblog/'+blogid);
   }

   viewBlog(blogid){
    const blogData = {
      blogDataId: blogid
    };
    this.modalCtrl.create({
      component: ViewblogPage,
      componentProps: blogData
    }).then(modalres => {
      modalres.present();
    });
   }
}
