import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

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

  private headers = new Headers({'Accept': 'application/json', 'charset': 'utf-8'});
  allowed: boolean = false;
  auth: any;
  constructor(
    private http: Http
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  currentUser: any;
 
  public login(credentials) :Observable <any>{
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(this.baseUrl+this.userUrl, {credentials}, {headers: this.headers})
        .map(res => {
          this.auth = res.json();
        })
        .catch(this.handleError);
    }
  }
 
  public register(credentials) : Observable<any>{
    if (credentials.fname === null || credentials.lname === null || credentials.email === null || credentials.gender === null || credentials.password === null) {
      return Observable.throw("Please insert details");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  handleError(error) {
    console.error(error);
    return Observable.throw(error.error || 'Server error');
  }
}
