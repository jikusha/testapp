import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent implements OnInit {

  id: number | undefined;

  userForm: FormGroup | undefined;

  @Input() user: IUser | undefined;

  

  constructor(private fb: FormBuilder, private _userService: UserService, private route: ActivatedRoute, private router: Router) { }

  text = "Select an option";



  stateList: Array<any> = [
    { name: 'Assam', cities: ['Nagaon', 'Guwahati', 'Jorhat', 'Silchar'] },
    { name: 'Uttar Pradesh', cities: ['Allahabad', 'Lucknow'] },
    { name: 'Andhra Pradesh', cities: ['Amravati'] },
    { name: 'Bihar', cities: ['Patna', 'Darbhanga'] },
    { name: 'Goa', cities: ['Panaji'] },
    { name: 'Gujrat', cities: ['Ahmedabad', 'Gandhinagar'] },
    { name: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur'] }
  ]


  cities: Array<any> | undefined;

  nrSelect = "";
  nrCity = "";


  ngOnInit(): void {

    this.nrSelect = this.user?.state;

    this.nrCity = this.user?.city;

    this.cities = this.stateList.find(con => con.name == this.nrSelect).cities;


    console.log(this.nrSelect, this.nrCity);

    this.userForm = this.fb.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone, [Validators.required, Validators.pattern("[0-9]{10}")]],
      city: [this.nrCity, Validators.required],
      state: [this.nrSelect, Validators.required]
    })


  }

  reset() {
    this.userForm?.reset();
  }

  update() {
    this._userService.updateData(this.userForm?.value, this.user?.id).subscribe(resp => {
      alert("User updated successfully");

    });
  }

  changeState(state: any) {
    this.cities = this.stateList.find(con => con.name == state).cities;

  }






}
