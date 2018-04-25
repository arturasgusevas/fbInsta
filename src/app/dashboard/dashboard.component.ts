import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { CommentService } from '../_services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import{ AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;

  posts: any;

  post: any = {
    photoURL: "",
    postText: "",
  }
  id: string;

  comment: any = {
    user_id: "",
    post_id: "",
    commentText: ""
  };

  postcomment: any;

  constructor(
    private _pS: PostService,
    private _cS: CommentService,
    private _auth: AuthService,
    private router: Router,
    private aR: ActivatedRoute
    ) { }

  ngOnInit() {
    this.posts = this._pS.getAllActivePosts();

    this._auth.user.subscribe(
      user => {
        this.user = user;
      }
  )
  }

  addComment(post){
    this._cS.createComment(this.user.uid, post.id, this.comment.commentText);
  }

  updateText(){
    this._pS.updateText(this.id, this.post.postText)
  }

  deletePhoto(){
    this._pS.deletePhoto(this.id, this.posts.imageName)
  }

  openField(post){
    this.postcomment = post.id;
    console.log(post.id)
  }

  valueChange(event){
    this.comment.commentText = event.target.value;
  }

  updateComment(){
    this._cS.updateComment(this.id, this.comment);
  }

  updateLikes(){
    ///
  }
}
