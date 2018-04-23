import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: any;
  post: any = {
    photoURL: "",
    postText: "",
  }
  id: string;

  constructor(private _pS: PostService) { }

  ngOnInit() {
    this.posts = this._pS.getAllActivePosts()
  }

  updateText(){
    this._pS.updateText(this.id, this.post.postText)
  }

  deletePhoto(){
    this._pS.deletePhoto(this.id, this.posts.imageName)
  }

}
