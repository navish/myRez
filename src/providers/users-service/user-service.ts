import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {
  baseUrl = "http://localhost:8080/api/"
  userUrl = "user/";

  private headers = new Headers({'Accept': 'application/json', 'charset': 'utf-8'});

  constructor(
    public http: Http,
  ) {
  }  
 
  getUser(username):Observable <User> {
    let params =  new HttpParams();
    return this.http.post(this.baseUrl+this.userUrl, {username}, {headers: this.headers})
               .map(res => res.json())
               .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.error || 'Server error');
  }

}
