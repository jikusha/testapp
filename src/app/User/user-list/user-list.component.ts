import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  page=1;

  showModal: boolean=false;

  userModal: any;

  
  title="User List";
  filterText: string="";
  filterText1: string="";
  filterText2: string="";
  filterText3: string="";
  filterText4: string="";
  filterText5: string="";
 
  sortedColumn!: string;

  order!: string;

  showUpdate: boolean=false;

  constructor(private _userService: UserService) { 
    
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(resp => {
      this.users=resp;  
    });

  }

  users: IUser[]=[];


  deleteData(id: any){
    this._userService.deleteData(id).subscribe(resp => {
      alert("User with id="+id+" is deleted");
      this.ngOnInit();
      
    })
  }

  openModal(user: IUser){
    this.showModal=true;
    this.userModal=user;
  }
  
  openUpdate(user: IUser){
    this.showUpdate=true;
    this.userModal=user;
  }

  closeModal(){
    this.showUpdate=false;
    this.ngOnInit();
    
  }

 

}
