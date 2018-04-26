import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { CommentService } from '../_services/comment.service';
import { LikeService }  from '../_services/like.service';
import { Router, ActivatedRoute } from '@angular/router';
import{ AuthService } from '../core/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';


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

  like: any = {
    user_id: "",
    post_id: "",
    likeCount: 0
  }

  postcomment: any;

  constructor(
    private _pS: PostService,
    private _cS: CommentService,
    private _likeS: LikeService,
    private _auth: AuthService,
    private router: Router,
    private aR: ActivatedRoute,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {

    this._auth.user.subscribe(
      user => {
        this.user = user;
        
          this.posts = this._pS.getAllActivePosts(user.uid);
      }
    )
  }

  openDialog(post) {
    this.dialog.open(ModalComponent, {
      width: '90%',
      data: { imgURL: post.photoURL }
    });
  }

  addLike(post){
    this._likeS.sendLike(this.user.uid, post.id, this.like.likeCount)
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
  }

  valueChange(event){
    this.comment.commentText = event.target.value;
  }

  updateComment(){
    this._cS.updateComment(this.id, this.comment);
  }


}
