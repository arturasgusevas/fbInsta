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

  edited = false;

  posts: any;
  post: any = {
    photoURL: "",
    postText: "",
  }
  id: string;
  comment: ""

  constructor(
    private _pS: PostService,
    private _cS: CommentService,
    private _auth: AuthService,
    private router: Router,
    private aR: ActivatedRoute
    ) { }

  ngOnInit() {
    this.posts = this._pS.getAllActivePosts();
  }

  addComment(){
    this._auth.user.subscribe(
      user => {
        this._cS.createComment(user.user_id, user.post_id, user.commentText).then(
          comment => {
            return this.router.navigate(['comment', post_id]);
          }
        );
      }
    )
  }

  updateText(){
    this._pS.updateText(this.id, this.post.postText)
  }

  deletePhoto(){
    this._pS.deletePhoto(this.id, this.posts.imageName)
  }

  openField(){
    this.edited = true;
  }

  updateComment(){
    this._cS.updateComment(this.id, this.comment);
  }

  updateLikes(){
    ///
  }
}
