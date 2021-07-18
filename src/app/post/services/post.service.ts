import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { PostForm } from "../models/post.form";

const API = 'http://localhost:8080';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {

    }

    getPosts() {
        return this.http.get<Post[]>(`${API}/posts`);
    }

    getOne(postId: number) {
        return this.http.get<Post>(`${API}/posts/${postId}`);
    }

    save(formValues: PostForm) {
        return this.http.post<Post>(`${API}/posts`, {
            title: formValues.title,
            content: formValues.content,
            newTags: formValues.tags
        })
    }

    update(formValues: PostForm, postEditId: number) {
        return this.http.put<Post>(`${API}/posts/${postEditId}`,{
            title: formValues.title,
            content: formValues.content,
            tags: formValues.tags
        })
    }
}