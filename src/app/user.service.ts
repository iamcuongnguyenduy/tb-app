import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>("http://localhost:3000/userlist")
      .pipe(map((res: any)=>{
        return res;
      }));
  }

  postUser(data: User){
    return this.http.post<User>("http://localhost:3000/userlist", data)
      .pipe(map((res: any)=>{
        return res;
      }));
  } 


}

