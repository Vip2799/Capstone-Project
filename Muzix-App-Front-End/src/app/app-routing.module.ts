import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { LoginComponent } from './login/login.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MoviesComponent } from './movies/movies.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"" ,redirectTo:"login", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"home",component:DashboardComponent},
  {path:"movie-view/:id",component:MovieViewComponent},
  {path:"profile",component:ProfileComponent},
  {path:"favourite",component:FavouriteComponent},
  {path:"movies",component:MoviesComponent},
  {path:"**",redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
