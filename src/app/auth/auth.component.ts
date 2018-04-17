import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type UserFields = 'name' | 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userForm: FormGroup;
  formErrors: FormErrors = {
    'name': '',
    'email': '',
    'password': ''
  }
  validationMessage = {
    'email': {
      'required': 'Email is required',
      'email': 'Email must be valid'
    },
    'name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 3 chars long',
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Password must contain at least one letter and one number',
      'minlength': 'Password must be at least 6 chars long',
      'maxlength': 'Password can not be more that 40 chars long'
    },
  }

  constructor() { }

  ngOnInit() {
  }

}
