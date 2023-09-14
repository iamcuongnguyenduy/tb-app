import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/userlist"

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
      .pipe(map((res: any)=>{
        return res;
      }));
  }
  
  checkTakenUser(key: string, username: string){
    return this.http.get<User>(`${this.apiUrl}?${key}=${username}`)
      .pipe(map((res: any)=>{
        return res;
      }));
  }

  postUser(data: User){
    return this.http.post<User>(this.apiUrl, data)
      .pipe(map((res: any)=>{
        return res;
      }));
  } 

  
}

