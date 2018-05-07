import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user';
import { SessionService } from "../session/session";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {
  baseUrl = "http://localhost:8080/api/"
  userUrl = "user/";

  constructor(
    public http: Http,
    public sessionService: SessionService
  ) {}  

  token = this.sessionService.getToken();
  private headers = new Headers({'Authorization': 'Token token = '+ this.token, 'Accept': 'application/json', 'charset': 'utf-8'});

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
