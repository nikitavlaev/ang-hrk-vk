import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { InfoFriendsComponent } from './info-friends/info-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    AuthButtonComponent,
    InfoFriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
