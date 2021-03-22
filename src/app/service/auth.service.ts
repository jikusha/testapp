import { Injectable } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { IUser1 } from '../model/user1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private messageService: MessageService) { }

  currentUser: IUser1;
  redirectUrl: string;

  login(user: IUser1) {
    this.currentUser=user;
    localStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem("isLoggedIn","true");
    // this.messageService.addMessage(`User: ${this.currentUser.email} logged in`);
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.messageService.addMessage(`User: ${obj.email} logged in`);
  }

  get isLoggedIn() {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return !!obj;
    
  }

  logOut() {
    this.currentUser=null;
    localStorage.setItem("isLoggedIn","false");
    localStorage.setItem('currentUser', null);
  }
}
