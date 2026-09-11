import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environement} from '../../environement/environement';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  apiUrl = 'api/users'

  private readonly TOKEN_KEY = 'token';

  saveToken(token: any) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  login(username: string, password: string){
    const user: User = {
      username: username,
      password: password,
      firstName: '',
      lastName: '',
      email: ''
    };
    return this.http.post(environement.baseUrl + this.apiUrl + '/login', user,  {
      responseType: 'text'
    });
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }



}
