import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentService {

  constructor(private afs: AngularFirestore) { }

  createComment(post_id, user_id, commentText){
          const comment = {
          "post_id": post_id,
          "user_id": user_id,
          "commentText": commentText,
        }
        return this.afs.collection('comments').add(comment);
      }

      getComment(id){
        return this.afs.doc<any>(`comments/${id}`)
      }

      updateComment(id, commentText){
        return this.getComment(id).update({'commentText': commentText})
      }



}
