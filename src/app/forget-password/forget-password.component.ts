import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser1 } from '../model/user1';
import { AuthService } from '../service/auth.service';
import { ContactService } from '../service/contact.service';
import { NotificationService } from '../service/notification.service';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private registerService: RegisterService, private auth: AuthService, private router: Router, private notification: NotificationService) { }

  forgetForm: FormGroup | undefined;
  users: IUser1[];
  filteredUsers: IUser1[];

  ngOnInit(): void {

    this.forgetForm=this.fb.group({
     
      
      email:['',[Validators.required,Validators.email]],
      
    })

    

  }

  reset(){
    this.forgetForm?.reset();
    
  }

  save(){
    
    this.registerService.getUsers().subscribe(resp => {
      this.users=resp;
      this.filteredUsers=this.users.filter(con => con.email === this.forgetForm?.value.email);
      if(this.filteredUsers.length === 0){
        this.notification.warn(":: Email is not registered!!");
      }
      else {
      console.log(typeof(this.forgetForm?.value.email));
      this.registerService.getByEmail(this.forgetForm?.value.email).subscribe(resp => {
      this.notification.success(":: Password is sent in Email!!")
      this.forgetForm?.reset();
      this.router.navigate(['/signin']);
  });
      }
    })
    
    
  }


}
