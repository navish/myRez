import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ResListsPage } from '../pages/res-lists/res-lists'
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ResolutionsPage } from "../pages/resolutions/resolutions";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../providers/users-service/user-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SessionService } from '../providers/session/session';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ResListsPage,
    SigninPage,
    SignupPage,
    LoginPage,
    RegisterPage,
    ResolutionsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ResListsPage,
    SigninPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    Deeplinks,
    LoginPage,
    RegisterPage,
    ResolutionsPage,
    TabsPage,
    //InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthServiceProvider,
    SessionService
  ]
})
export class AppModule {}
