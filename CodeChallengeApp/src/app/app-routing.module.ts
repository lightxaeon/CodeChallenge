import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLocalComponent } from './components/blog-local/blog-local.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: BlogsComponent
  },
  {
    path: 'blogsLocal',
    component: BlogLocalComponent
  },
  {
    path: '*',
    component: NoPageFoundComponent
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], exports: [RouterModule]
})
export class AppRoutingModule { }
