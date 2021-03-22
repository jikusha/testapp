import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from './messages/message.service';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string){
      

      if(this.auth.isLoggedIn){
        
        return true;
      }
      else {
        this.auth.redirectUrl=url;
        
        this.router.navigate(['/signin']);
        return false;
      }
  }
  
}
