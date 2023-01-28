/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs/operators';
const API_URL = environment.ApiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired(){
    return this._refreshrequired;
  }

  loadBlogs(): Observable<any>{
    return this.http.get(`${API_URL}/blog/blogs`);
  }

  addUser(useradd): Observable<any>{
    return this.http.post(`${API_URL}/user/add`,useradd);
  }

  uploadBlog(blog): Observable<any>{
    return this.http.post(`${API_URL}/blog/add`,blog).pipe(
      tap(()=>{
        this._refreshrequired.next();
      })
    );
  }

  getBlog(blogid): Observable<any>{
    return this.http.get(`${API_URL}/blog/view/${blogid}`);
  }

  getProfile(userid): Observable<any>{
    return this.http.get(`${API_URL}/user/find/${userid}`);
  }

  getBlogByUser(userid): Observable<any>{
    return this.http.get(`${API_URL}/blog/viewByUser/${userid}`);
  }
}

