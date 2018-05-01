import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Storage } from "@ionic/storage";

@Injectable()
export class SessionService {
  appId: any;
  constructor(
    private storage: Storage
  ) { }

  public authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }


 }
