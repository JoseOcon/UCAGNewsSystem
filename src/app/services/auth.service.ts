import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  actualUser;

  private module = 'auth/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let json: any = {
      password,
    };

    email.indexOf('@') !== -1
      ? (json.email = email)
      : (json.identification = email);

    return this.http.post(
      `${environment.SERVER_URL}${this.module}login`,
      json,
      { observe: 'response' }
    );
  }

  verifyUser(user_id: number) {
    let json = {
      verified: true,
    };

    return this.http.put(`${environment.SERVER_URL}user/${user_id}`, json, {
      observe: 'response',
    });
  }

  passwordRecovery(email: string) {
    let json = {
      email
    }

    return this.http.post(`${environment.SERVER_URL}${this.module}forget/`, json, {
      observe: 'response',
    });
  }

  resetPassword(uuid: string, password: string) {
    let json = {
      uuid,
      password,
    };

    return this.http.put(`${environment.SERVER_URL}${this.module}reset`, json, {
      observe: 'response',
    });
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
