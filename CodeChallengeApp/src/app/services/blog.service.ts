import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private myAppUrl = "https://localhost:44350/";
  private myApiUrl= "api/blog/";
  constructor(private http: HttpClient) { }

  getListBlogs(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);

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
