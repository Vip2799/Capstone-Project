import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginAuthService } from '../services/login-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );
  userName:string  = "";
  profilepic:string = "";
  isLoggedIn: boolean = false;
    
  toolkit: boolean = false;
  ngOnInit(): void {
    
    // this.movieservice.getUpdatedMovieList();
    if (localStorage.getItem("emailId")) {
      this.loginAuth.login();
      this.userservice.getProfile(localStorage.getItem("emailId")).then((data)=>{
        let user:any = data
        this.userName = user.userName;
        this.profilepic = user.profilePic

      })
    }
    else {
      this.loginAuth.logout();
    }
    // console.log(this.isLoggedIn);
    this.isLoggedIn = this.loginAuth.isLoggedIn;
  }

  logout() {
    localStorage.removeItem("emailId");
    localStorage.removeItem("jwt");
    this.loginAuth.logout;
    this.router.navigate(['home']).then(()=>{
      window.location.reload();
    })
  }

  profile() {
    if (this.toolkit) {
      this.toolkit = false;
    } else {
      this.toolkit = true;
    }
  }
  constructor(private userservice: UserService, private router: Router, private loginAuth: LoginAuthService, private movieservice:MovieService) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // throw new Error('Method not implemented.');
  //   console.log("inside changes")
  //   console.log(changes)

  // }


}
