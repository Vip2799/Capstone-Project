import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginAuthService } from '../services/login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn: boolean = false;

  toolkit: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem("emailId")) {
      this.loginAuth.login();
    }
    else {
      this.loginAuth.logout();
    }
    console.log(this.isLoggedIn);
    this.isLoggedIn = this.loginAuth.isLoggedIn;
  }

  logout() {
    localStorage.removeItem("emailId");
    localStorage.removeItem("jwt");
    this.loginAuth.logout;
    window.location.reload();
    this.router.navigate(['login'])
  }

  profile() {
    if (this.toolkit) {
      this.toolkit = false;
    } else {
      this.toolkit = true;
    }
  }
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private loginAuth: LoginAuthService) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // throw new Error('Method not implemented.');
  //   console.log("inside changes")
  //   console.log(changes)

  // }


}
