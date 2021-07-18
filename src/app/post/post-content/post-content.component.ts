import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  post: Post;
  postId: number;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params.postId;
    this.postService.getOne(this.postId)
    .subscribe(post=>{
      this.post = post
    });
  }
  redirect(){
    this.router.navigate([`posts/edit/${this.postId}`])
  }
}
