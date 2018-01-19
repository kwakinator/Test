import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { OptionComponent } from './poll-list/option/option.component';

import { PollService } from './poll.service';
import { UserService } from './user.service';
import { Option1Component } from './poll-list/option/option1/option1.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    PollCreateComponent,
    PollListComponent,
    OptionComponent,
    Option1Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PollService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
