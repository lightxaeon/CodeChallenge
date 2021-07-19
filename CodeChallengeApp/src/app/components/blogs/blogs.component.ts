import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  listBlogs: any[] = [];
  action = 'Add';
  form: FormGroup;
  id: number | undefined;
  notEmptyPost = true;
  notScrolly = true;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _blogService: BlogService,private spiner:NgxSpinnerService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs() {
    this._blogService.getListBlogs().subscribe(data => {
      this.listBlogs = data;
    },
      error => { console.log(error); });
  }
  saveBlog() {
    // const blog: any = {
    //   title: this.form.get('title')?.value,
    //   content: this.form.get('content')?.value
    // }
    // this.listBlogs.push(blog);
    // this.toastr.success('Your blog was submitted!', 'Blog posted!');
    // this.form.reset();
    const blog: any = {
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value
    };
    if (this.id == undefined) {
      this._blogService.addBlog(blog).subscribe(data => {
        this.toastr.success('Your blog was submitted!', 'Blog posted!');
        this.getBlogs();
        this.form.reset();

      }, error => { this.toastr.error('oops, somethig was wrong', 'Error') });

    }
    else {
      console
      blog.id=this.id;
      this._blogService.editBlog(this.id, blog).subscribe(data => {

        this.id = undefined;
        this.toastr.success('Your blog was updated!', 'Blog updated!');
        this.getBlogs();
        this.form.reset();

      });
      this.action = "Add"; 
    }
  }
  deleteBlog(index: number) {
    // this.listBlogs.splice(index,1);   
    //this.toastr.error('Your blog was deleted!', 'Blog deleted!');
    this._blogService.deleteBlog(index).subscribe(data => {
      this.toastr.error('Your blog was deleted!', 'Blog deleted!');
      this.getBlogs();
    }, error => { console.log(error) });
  }
  editBlog(blog: any) {
    this.action = "Edit";
    this.id = blog.id;
    this.form.patchValue({
      title: blog.title,
      content: blog.content,
    })
  }
  onScroll(){
    if(this.notScrolly && this.notEmptyPost ){

      this.spiner.show();
      this.notScrolly=false;
      this.loadNext();
    }
  }
  loadNext(){
 setTimeout(() => {
  this.notScrolly=true;
   
  this.spiner.hide();
 }, 1000);
  }
}
