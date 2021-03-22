import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser1 } from 'src/app/model/user1';
import { NotificationService } from 'src/app/service/notification.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup | undefined;
  users: IUser1[];
  err="";
  constructor(private fb: FormBuilder, private registerService: RegisterService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  reset(){
    this.userForm?.reset();
  }

  save() {
    this.users=[];
    this.err="";
    this.registerService.getUsers().subscribe(resp => {
      this.users=resp;
      this.users=this.users.filter(data => data.email == this.userForm?.value.email);
      if(this.users.length!==0){
       
        this.notification.warn(":: User already exists!!");
        
      }
      else {
        this.registerService.postData(this.userForm?.value).subscribe(resp => {
          this.notification.success(":: Registered Successfully!!");
          this.userForm?.reset();
        })
      }
    })
    
  }


}
