import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public modal: MatDialog) { }

  ngOnInit(){
  }


}
