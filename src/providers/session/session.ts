import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  setUserAppId(user){
    localStorage.setItem('userAppId', user);    
  }
  getUserAppId(){
    return localStorage.getItem('userAppId');
  }

}
