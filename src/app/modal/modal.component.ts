import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostService } from '../_services/post.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  post: any = {
    photoURL: "",
    postText: "",
  }
  id: string;

  constructor(
    public dialog: MatDialog,
    private _pS: PostService,
    public thisDialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
    ) { }

  ngOnInit(){
  }



}
