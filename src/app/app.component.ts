
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';
import { AuthService } from './service/auth.service';
import { RegisterService } from './service/register.service';
import {  Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DialogService } from './service/dialog.service';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private dialogService: DialogService, private contactService: ContactService){
    
  }

  

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName() {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(obj){
      // return this.authService.currentUser.email;
      
      return obj.email;
    }
    return '';
  }

  logOut(): void {

    this.dialogService.openConfirmDialog("Do you really want to logout?").afterClosed().subscribe(res => {
      if(res){
        
          this.authService.logOut();
          console.log('Log out');
          this.router.navigateByUrl('/signin');
              
          }
      
    });
    
  }



  title = 'CONTACT MANAGER';

  displayMessages(){
    this.router.navigate([{outlets: {popup: ['messages']}}]);
    this.messageService.isDisplayed=true;
  }

  hideMessages(){
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed=false;

  }

  get isDisplayed(){
    return this.messageService.isDisplayed;
  }

 

}
