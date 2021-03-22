import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  str: string="";
  userForm:FormGroup | undefined ;
  text="Select an option";

  stateList :Array<any>=[
    {name: 'Assam',cities:['Nagaon','Guwahati','Jorhat','Silchar']},
    {name: 'Uttar Pradesh',cities:['Allahabad','Lucknow']},
    {name: 'Andhra Pradesh',cities:['Amravati']},
    {name: 'Bihar',cities:['Patna','Darbhanga']},
    {name: 'Goa',cities:['Panaji']},
    {name: 'Gujrat',cities:['Ahmedabad','Gandhinagar']},
    {name: 'Jharkhand',cities:['Ranchi','Jamshedpur']}
  ]

  cities: Array<any> | undefined;

  constructor(private fb: FormBuilder,private _userService:UserService) { }

  ngOnInit(): void {

    this.userForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      city:['',Validators.required],
      state:['',Validators.required]
    })

  }

  reset(){
    this.userForm?.reset();
  }

  save(){
    this._userService.postData(this.userForm?.value).subscribe(resp => {
      alert("User added successfully");
      this.userForm?.reset();
  });
    
  }

  changeState(state: any) {
    this.cities = this.stateList.find(con => con.name == state).cities;
  }

  

}
