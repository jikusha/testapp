import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  pageTitle="User Detail";
  user!: IUser;
  constructor(private router: Router,private route: ActivatedRoute,private _userService:UserService) {
    
  }

  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this._userService.getById(id).subscribe(resp=>this.user=resp);
  }

  onBack(){
    this.router.navigate(['users']);
  }

}
