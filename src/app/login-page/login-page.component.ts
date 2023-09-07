import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../validators/user.validators';

import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      // CommonValidators.shouldBeUnique
    ]),
    password: new FormControl('', [Validators.required, UserValidators.cannotContainSpace])
  });


  // constructor(private userService: UserService, private http: HttpClient){
  //   http.get('https://jsonplaceholder.typicode.com/posts')
  //     .subscribe(response => {
  //       console.log(response);
        
  //     })
  // }
  users: User[]=[];
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers();
  }

  get username(){
    return this.form.get('username')
  }
  get password(){
    return this.form.get('password')
  }

  login(){
    this.form.setErrors({
      invalidLogin: true,
    })       
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      })
  }

}
