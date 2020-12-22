import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    MenuComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
