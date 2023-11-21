import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    console.log("eu");
    localStorage.removeItem('jwt_token');
  }
  private apiUrl = 'http://globalfy-user.us-east-2.elasticbeanstalk.com/auth/login';
  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}
