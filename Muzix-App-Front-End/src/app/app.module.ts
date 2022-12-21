import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { FavouriteComponent } from './favourite/favourite.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SafePipe } from './safe.pipe';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviesComponent } from './movies/movies.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { OrderServiceComponent } from './order-service/order-service.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    SearchComponent,
    RegistrationComponent,
    MovieViewComponent,
    FavouriteComponent,
    LoginComponent,
    DashboardComponent,
    SafePipe,
    MovieCardComponent,
    MoviesComponent,
    NextDirective,
    PrevDirective,
    OrderServiceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
