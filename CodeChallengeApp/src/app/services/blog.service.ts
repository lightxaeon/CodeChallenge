import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private myAppUrl = "http://localhost:42399/";
  private myApiUrl= "api/blog/";
  constructor(private http: HttpClient) { }

  getListBlogs(params: any): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl,{params});

  }
  deleteBlog(id:number): Observable<any> {
    return this.http.delete(this.myAppUrl+this.myApiUrl+id)
  }
  addBlog(blog:any):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,blog);
  }
  editBlog(id:number,blog:any):Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+id,blog);
  }
}
