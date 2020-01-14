import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

// Import social login module
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// Import login providers
import { FacebookLoginProvider } from "angularx-social-login";

import { AppRoutingModule } from "./app-routing.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
// import { PortalRowDirective } from './directives/portal-row.directive';
// import { HomeComponent } from "./components/home/home.component";

const socketConfig: SocketIoConfig = { url: "http://localhost:3000", options: {} };
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("831828400593240")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    SocialLoginModule,
    NgbModule,
    SocketIoModule.forRoot(socketConfig)
  ], // .initialize(config)
  providers: [
    {
      provide: AuthServiceConfig,

      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
