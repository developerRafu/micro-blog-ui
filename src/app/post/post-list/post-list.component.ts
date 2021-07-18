import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  form: FormGroup;
  constructor(
    private service: PostService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.service.getPosts()
    .subscribe(posts => {
      this.posts = posts;
    });
    this.form = this.formBuilder.group({
      text: [null]
    })
  }

  redirect(id: number){
    this.router.navigateByUrl(`posts/${id}`);
  }

  search(){
    const text: string = this.form.get('text').value;
    console.log(text);
    this.posts = this.posts.filter(post => post.title.toLowerCase().includes(text.toLowerCase()))
  }
  redirectNew(){
    this.router.navigate(['posts/new']);
  }
}
