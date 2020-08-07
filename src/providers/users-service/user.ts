export class User {
    fname: string;
    lname: string;
    email: string;
    pass: string;
 
  constructor(fname: string, lname: string, email: string, password: string) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.pass = password;
  }
}