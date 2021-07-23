import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 12];
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _blogService: BlogService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.getBlogs();
  }
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  getBlogs() {
    const params = this.getRequestParams(this.page, this.pageSize);

    this._blogService.getListBlogs(params).subscribe(response => {
      this.listBlogs = response.data;
      this.count = response.count;
    },
      error => { console.log(error); });
  }
  saveBlog() {
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
      blog.id = this.id;
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

  handlePageChange(event: number): void {
    this.page = event;
    this.getBlogs();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getBlogs();
  }
}
