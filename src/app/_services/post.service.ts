import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class PostService {

  constructor(
    private _aS: AuthService,
    private afs: AngularFirestore
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

  createPostPicture(uid){
          const picture = {
          "user_uid": uid,
          "status": "draft",
          "photoURL": "",
          "comment": ""
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

}
