import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {

  constructor(
    private _aS: AuthService,
    private afs: AngularFirestore,
    private _uS: UserService
    ) { }

  uploadPicture(upload, id){
    const storageRef = firebase.storage().ref();
    const imageName = new Date().getTime();
    const uploadTask = storageRef.child(`posts/${imageName}`).put(upload);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes)
        * 100
      },
      (error) => {
        console.log('error')
      },
      () => {
        if(uploadTask.snapshot.downloadURL){
          const newPicture = {
            photoURL: uploadTask.snapshot.downloadURL,
            imageName: imageName,
          }
          this.updatePicture(newPicture, id);
          return;
        }else{
          console.log('file not loaded')
        }
      }
    );
  }

  getOnePost(id){
    return this.afs.doc<any>(`posts/${id}`);
  }

  private updatePicture(upload, id){
    return this.getOnePost(id).update(upload);
  }

  updateText(id, postText){
    return this.getOnePost(id).update({'postText': postText});
  }

  updateStatus(id, status){
    return this.getOnePost(id).update({status: 'active'});
  }

  createPostPicture(uid){
          const picture = {
          "user_uid": uid,
          "status": "draft",
          "photoURL": "",
          "postText": "",
          "created_at": new Date().getTime(),
          "updated_at": new Date().getTime()
        }
        return this.afs.collection('posts').add(picture);
      }

      deletePhoto(id, pictureName){
        this.getOnePost(id).update({
          photoURL: "",
          imageName: ""
        }).then(
          () => {
            const storageRef = firebase.storage().ref();
            storageRef.child(`posts/${pictureName}`).delete();
          }
        );
      }

      getAllActivePosts(){
        return this.afs.collection('posts',
        (ref) => ref
        .where('status', '==', 'active')
        .orderBy('created_at', 'desc'))
        .snapshotChanges().map(
          (posts => {
            return posts.map(
              post => {
                const data = post.payload.doc.data();
                const user = this._uS.getProfile(data.user_uid).valueChanges();

                return {
                  id: post.payload.doc.id,
                  user_uid: data.user_uid,
                  description: data.description,
                  user: user,
                  photoURL: data.photoURL,
                }
              }
            )
          })
        )
      }

}
