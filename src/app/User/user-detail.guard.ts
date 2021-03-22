import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailGuard implements CanActivate {

  constructor(private router: Router, private _userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    let id = +route.paramMap.get('id');

    if (isNaN(id) || id < 1) {
      alert("Invalid product Id");
      this.router.navigate(['/users']);
      return false;
    }
    return true;
  }

}
