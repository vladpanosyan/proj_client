import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// services
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from "./services/user/user.service";
import { InterceptorService } from "./services/interceptor/interceptor.service";
//
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// components
import { UserRegistrationComponent } from "./components/registration/user-registration/user-registration.component";
import { UserLoginComponent } from "./components/login/user-login/user-login.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: "api/users/register",
    component: UserRegistrationComponent
  },
  {
    path: "api/users/login",
    component: UserLoginComponent
  },
  {
    path: "api/users/profile/:id",
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  exports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class AppRoutingModule {
  constructor() {}
}
