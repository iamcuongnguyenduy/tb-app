import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../validators/user.validators';

import { UserService } from '../user.service';
import { User } from '../user';
import { Route, Router } from '@angular/router';

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
    ]),
    password: new FormControl('', [Validators.required, UserValidators.cannotContainSpace])
  });

  users: User[]=[];
  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
   }

  get username(){
    return this.form.get('username')
  }
  get password(){
    return this.form.get('password')
  }

  login(){
    if(this.form.invalid){
      alert("Correct all fields before Login")
    }
    else{
    this.userService.getUsers()
      .subscribe(res => {
          // console.log(res);
          const userFound = res.find((user: User)=>{
              console.log(user.username===this.username?.value && user.password === this.password?.value);              
              return (user.username===this.username?.value && user.password === this.password?.value)
          });
          if(userFound){
            alert("Login successfully");
            this.form.reset;
            this.router.navigate(['userboard'])           
          }
          else
            alert("User is not found")

        }, err=>{
          alert("Something went wrong")
        })  
      }   
  }
}
