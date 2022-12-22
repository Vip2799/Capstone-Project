import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { CanDeactiveGuard } from './guards/can-deactive.guard';
import { LoginGaurdGuard } from './guards/login-gaurd.guard';
import { LoginComponent } from './login/login.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MoviesComponent } from './movies/movies.component';
import { OrderServiceComponent } from './order-service/order-service.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"" ,redirectTo:"login", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent,canDeactivate:[CanDeactiveGuard]},
  {path:"home",component:DashboardComponent},
  {path:"movie-view/:id",component:MovieViewComponent},
  {path:"profile",component:ProfileComponent, canActivate:[LoginGaurdGuard]},
  {path:"favourite",component:FavouriteComponent,canActivate:[LoginGaurdGuard]},
  {path:"movies",component:MoviesComponent},
  {path:"payment",component:OrderServiceComponent,canActivate:[LoginGaurdGuard ]},
  {path:"**",redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
