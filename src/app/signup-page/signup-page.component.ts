import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../validators/user.validators';

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
    constructor(private fb: FormBuilder){}
    ngOnInit(): void {
      this.form = this.fb.group({
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

    signup(){
      // this.form.setErrors({
      //   invalidSignUp: true
      // })
      console.log("Pressed Sign-up");
    }
}

