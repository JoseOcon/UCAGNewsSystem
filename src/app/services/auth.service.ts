import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actualUser;

  constructor(
    private http: HttpClient
  ) {}

  login(email: string, password: string){
    let json: any = {
      password
    }

    email.indexOf("@") !== -1 ? json.email = email : json.identification = email

    return this.http.post(`${environment.SERVER_URL}auth/login`, json, {observe: 'response'})
  }

  passwordRecovery(email){
    return this.http.patch(`${environment.SERVER_URL}auth/`, email, {observe: 'response'})
  }

  /**
   * This method set item of type User to localStorage
   * @param user
   */
  setUserInLocalStorage(user: User): void {
    localStorage.setItem(
      `${environment.localstorage_key}`,
      JSON.stringify(user)
    );
  }

  /**
   * RemoveItem from localStorage based on environment's key
   */
  logout(): any {
    localStorage.removeItem(`${environment.localstorage_key}`);
  }

  /**
   * Return parsed item from LocalStorage
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem(`${environment.localstorage_key}`));
  }

  /**
   * Check if the user is logged
   */
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}