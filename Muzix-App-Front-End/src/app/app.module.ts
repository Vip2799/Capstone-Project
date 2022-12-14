import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
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
=======
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
>>>>>>> a452b528d77c59c090468e78ad7b2a0f048e07d1

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    NavigationComponent,
    ProfileComponent
=======
    SearchComponent
>>>>>>> a452b528d77c59c090468e78ad7b2a0f048e07d1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
=======
    FormsModule
>>>>>>> a452b528d77c59c090468e78ad7b2a0f048e07d1
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
