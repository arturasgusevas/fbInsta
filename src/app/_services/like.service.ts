import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../_services/user.service';

@Injectable()
export class LikeService {

  constructor(
    private afs: AngularFirestore,
    private _aS: AuthService,
    private _uS: UserService
    ) { }

    sendLike(user_id, post_id, likeCount){
            const like = {
            "post_id": post_id,
            "user_id": user_id,
            "likeCount": 0
          }
          return this.afs.collection('likes').add(like);
        }

        getLikes(id){
          return this.afs.doc<any>(`likes/${id}`)
        }

        userLiked(user_id, post_id){
          return this.afs.collection(
            "likes", ref => ref.where("post_id", "==", post_id)
            .where("user_id", "==", user_id))
            .snapshotChanges().map(
              (likes => {
                return likes.map(
                  like => {
                    return {
                      id: like.payload.doc.id
                    }
                  }
                )
              })
            );

        }

        getAllLikes(post_id){
          return this.afs.collection(
            "likes", ref => ref.where("post_id", "==", post_id))
            .snapshotChanges().map(
              (likes => {
                return likes.map(
                  like => {
                    const data = like.payload.doc.data();
                    const user = this._uS.getProfile(data.user_id).valueChanges();

                    return {
                      user: user,
                      likeCount: data.likeCount
                    }
                  }
                )
              })
            );
        }

}
