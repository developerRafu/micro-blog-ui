import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostContentComponent } from './post/post-content/post-content.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'posts/new',
    component: PostFormComponent
  },
  {
    path: 'posts/edit/:postId',
    component: PostFormComponent
  },
  {
    path: 'posts/:postId',
    component: PostContentComponent
  },
  {
    path: '**',
    component: PostListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
