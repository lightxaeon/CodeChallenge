import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-local',
  templateUrl: './blog-local.component.html',
  styleUrls: ['./blog-local.component.scss']
})
export class BlogLocalComponent implements OnInit {
  ListBlogsLocal: any[] = [
    {
      title: "Title 1",
      content: "Content 1",
      image: ""
    },
    {
      title: "Title 2",
      content: "Content 2",
      image: ""
    },
    {
      title: "Title 3",
      content: "Content 3",
      image: ""
    },
    {
      title: "Title 4",
      content: "Content 4",
      image: ""
    },
    {
      title: "Title 5",
      content: "Content 5",
      image: ""
    },
    {
      title: "Title 6",
      content: "Content 6",
      image: ""
    }

  ];
  action = 'Add';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['']
    });
  }

  ngOnInit(): void {
  }

  saveBlog() {
    const blog: any = {
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value

    }
    if (this.id == undefined) {
      this.ListBlogsLocal.push(blog);
      this.toastr.success('Your blog was submitted!', 'Blog posted!');
      this.form.reset();
    }
    else {
      this.ListBlogsLocal[this.id]=blog;
        this.id = undefined;
        this.toastr.success('Your blog was updated!', 'Blog updated!');        
        this.form.reset();
        this.action = "Add";
    }



  }
  deleteBlog(index: number) {
    this.ListBlogsLocal.splice(index, 1);
    this.toastr.error('Your blog was deleted!', 'Blog deleted!');
  }
  editBlog(index: number, blog: any) {
    this.action = "Edit";
    this.id = index;
    this.form.patchValue({
      title: blog.title,
      content: blog.content,
    })
  }
}
