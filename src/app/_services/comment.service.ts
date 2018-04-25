import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../_services/user.service';

@Injectable()
export class CommentService {

  constructor(
    private afs: AngularFirestore,
    private _aS: AuthService,
    private _uS: UserService
    ) { }

  createComment(user_id, post_id, commentText){
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

      getAllComments(post_id){
        return this.afs.collection(
          "comments", ref => ref.where("post_id", "==", post_id))
          .snapshotChanges().map(
            (comments => {
              return comments.map(
                comment => {
                  const data = comment.payload.doc.data();
                  const user = this._uS.getProfile(data.user_id).valueChanges();

                  return {
                    user: user,
                    commentText: data.commentText
                  }
                }
              )
            })
          );
      }



}
