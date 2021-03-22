import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { IUser1 } from 'src/app/model/user1';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup ;
  users: IUser1[]=[];
  user: IUser1;
  errorMessage: string="";
  
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private auth: AuthService, private notification: NotificationService) {
    
   }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  reset(){
    this.userForm?.reset();
  }

  login() {
    this.registerService.getUsers().subscribe(resp => {
      this.users=resp;
      this.user = this.users.find(data => data.email == this.userForm.value.email);
      if(this.user) {

        if(this.user.password==this.userForm.value.password){
          
          
          this.auth.login(this.user);
          this.notification.success("Welcome"+ this.auth.currentUser.email);
          if(this.auth.redirectUrl){
            this.router.navigateByUrl(this.auth.redirectUrl);
          }
          else {
            this.router.navigate(['/users']);
          }
          
        }
        else{
          this.notification.warn(":: Password is incorrect!!");
        }
        
      }
    
      else {
        this.notification.warn(":: Username doesnot exists!!");
      }
      
  });

  
  
    
  }



  
 

}
