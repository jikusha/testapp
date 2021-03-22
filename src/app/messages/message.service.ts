import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private _messages: string[] = ["No message"];
  isDisplayed=false;
  
  get messages(): string {
    // return this._messages;
    return localStorage.getItem('messages') || '{}';
  }
  addMessage(message: string): void {
    const currentDate = new Date();
    // this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    localStorage.setItem('messages',message + ' at ' + currentDate.toLocaleString());
    
  }
}
