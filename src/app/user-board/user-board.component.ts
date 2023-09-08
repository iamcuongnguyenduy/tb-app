import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers()    
  }
  
  users: User[]=[];
  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      })
  }
}
