import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { User } from "../users-service/user";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  baseUrl = "http://localhost:8080/api/"
  userUrl = "login/";
  loginUrl = "sessions/create";
  registerUrl = "register/";

    authType: string;
    error: string;
  jwtHelper = new JwtHelper();
  user: string;

  private headers = new Headers({'Accept': 'application/json', 'charset': 'utf-8'});
  allowed: boolean = false;
  auth: any;
  
  constructor(
    private http: Http,
    public storage: Storage
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  currentUser: any;
 
authenticate(credentials) {
  this.authType == 'login' ? this.login(credentials) : this.signup(credentials);
}

login(credentials):Observable <any> {
  return this.http.post(this.baseUrl+this.loginUrl, credentials, { headers: this.headers })
    .map(res => res.json())
}

signup(credentials):Observable<any>{
  return this.http.post(this.registerUrl, JSON.stringify(credentials), { headers: this.headers })
    .map(res => res.json())
    
}

logout(): any {
  this.storage.remove('token');
  this.storage.remove('profile');
}
authSuccess(token) {
  this.error = null;
  this.storage.set('token', token);
  this.user = this.jwtHelper.decodeToken(token).userAppId;
  this.storage.set('profile', this.user);
}
  handleError(error) {
    console.error(error);
    return Observable.throw(error.error || 'Server error');
  }
}
