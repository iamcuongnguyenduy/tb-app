import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../validators/user.validators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
    // form = new FormGroup({
    //   username: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(10),
    //     Validators.email,
    //     CommonValidators.shouldBeUnique
    //   ]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     CommonValidators.cannotContainSpace,        
    //   ]),
    //   confirmPassword: new FormControl('', [
    //     Validators.required,
        
    //   ]),
    //   mobileNumber: new FormControl('',[
    //     Validators.required
    //   ])
    // })

    form: any;
    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
      ){}

    ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', [
            Validators.required,
            Validators.email, 
            Validators.minLength(10), 
            UserValidators.shouldBeUnique
          ]
        ],
        password: ['', [
            Validators.required, 
            UserValidators.cannotContainSpace
          ]
        ],
        confirmPassword: ['', Validators.required],
        mobileNumber: ['', Validators.required]
      }, {
        validator: UserValidators.passwordsShouldMatch
      });
    }
    
    user: User = new User();
    signup(){    
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.username = this.username.value;
      this.user.password = this.password.value;
      this.user.mobileNumber = this.mobileNumber.value;
      this.user.role = "Admin"
     
      this.userService.postUser(this.user)
        .subscribe(res=>{
          console.log(res); 
          alert("User created successfully")         
        }, err =>{
          alert("Add user get failed")
        })

        this.form.reset();
    }

    get firstName(){
      return this.form.get('firstName');
    }

    get lastName(){
      return this.form.get('lastName');
    }
      
    get username(){
      return this.form.get('username');
    }

    get password(){
      return this.form.get('password');
    }

    get confirmPassword(){
      return this.form.get('confirmPassword')
    }

    get mobileNumber(){
      return this.form.get('mobileNumber')
    }

    
}

