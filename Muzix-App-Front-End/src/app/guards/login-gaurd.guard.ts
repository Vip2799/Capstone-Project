import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurdGuard implements CanActivate {

  constructor(private loginauth:LoginAuthService, private router: Router, private snackbar:MatSnackBar){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result:boolean = this.loginauth.isLoggedIn ;
      if(result){
        return true;
      }else{
        this.snackbar.open("Please Login first to access this feature","!!",{duration:2000})
        this.router.navigate(["login"]);
        return false ;
      }
      }
  
}
