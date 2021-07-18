import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostForm } from '../models/post.form';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post;
  form: FormGroup
  errorLabel = '';
  tags = [];
  postEditId: number;
  constructor(
    private builder: FormBuilder,
    private service: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      title: [null],
      content: [null],
      tags: [[]]
    })
    this.postEditId = this.activatedRoute.snapshot.params.postId;
    this.service.getOne(this.postEditId).subscribe(post=>{
      this.form.get('title').setValue(post.title);
      this.form.get('content').setValue(post.content);
      this.tags = [].concat(post.tags);
    });
  }

  submit(){
    var formValues = new PostForm();
    formValues = this.form.getRawValue();
    if(formValues.title === null || formValues.content === null){
      this.errorLabel = 'Preencha os campos';
      return;
    }
    formValues.tags = this.tags;
    if(!this.postEditId){
    this.service.save(formValues).subscribe(res=>{
      this.router.navigate(['posts'])
    },error=>{
      this.errorLabel = error.error.msg
    });
  }else{
    this.service.update(formValues, this.postEditId).subscribe(res=>{
      this.router.navigate(['posts'])
    },error=>{
      this.errorLabel = error.error.msg
    });
  }    
  }
  addTags(){
    this.tags = this.tags.concat('#'+this.form.get('tags').value)
  }
  removeTag(tag: string){
    this.tags = this.tags.filter(tagFilter => tagFilter !== tag);
  }
}
