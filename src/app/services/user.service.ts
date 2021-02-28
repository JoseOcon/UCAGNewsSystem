import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private module = "user/"
  public users = []

  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get(`${environment.SERVER_URL}${this.module}`);
  }

  getUser(user_id: number){
    return this.http.get(`${environment.SERVER_URL}${this.module}${user_id}`)
  }

  createUser(user: User){
    return this.http.post(`${environment.SERVER_URL}${this.module}`, user, {observe: 'response'})
  }

  editUser(user: User){
    return this.http.put(`${environment.SERVER_URL}${this.module}${user.user_id}`, user, {observe: 'response'})
  }
  
  deseableUser(user_id: number){
    return this.http.delete(`${environment.SERVER_URL}${this.module}${user_id}`, {observe: 'response'})
  }
}
