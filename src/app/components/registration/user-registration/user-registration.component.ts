import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { AuthService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { switchmap } from "rxjs/operators";
import { MustMatch } from "./../../../HELPERS/mutch";

import { User } from "./../../../models/user";
@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.css"]
})
export class UserRegistrationComponent implements OnInit {
  public user: any;
  // user: any;
  registerForm: FormGroup;
  submited: false;
  loggedIn: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: UserAuthService,
    private socialAuthService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.userService.getUser().subscribe(data => this.user = JSON.stringify(data, null, 2));
    this.registerForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confPassword")
      });
    //
    this.socialAuthService.authState
    .subscribe(user => {
      // this.loggedIn = user != null;
      if (user) {
        this.authService.regWithFace(user.authToken)
        .subscribe((response: any) => {
          this.userService.addToken("currentUser", response);
          this.authService.refresh(response);
          this.router.navigate([`api/users/profile`, response.id]);
        });
      }
    },
    error => console.log(error, 85858585));
  }

  detectClass(field) {
    if (
      this.registerForm.controls[field].dirty &&
      this.registerForm.controls[field].invalid
    ) {
      return "no_valid";
    } else if (
      this.registerForm.controls[field].dirty &&
      this.registerForm.controls[field].valid
    ) {
      return "is_valid";
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }

  // FC_Login() {
  //   console.log("in user-registration component");
  //   this.authService.regWithFace()
  //   .subscribe(x => console.log(x), err => console.log(err, 2109));
  // }

  onSubmit() {
    console.log(this.registerForm.value);
    const userData = this.registerForm.value;
    delete userData.confPassword;

    this.userService.AddUser(userData).subscribe(
      (data: any) => {
        if (data.firstName) {
          console.log(data, typeof data);
          this.userService.addToken("currentUser", data);
          this.authService.refresh(data);
          this.router.navigate([`api/users/profile`, data.id]);
        }
      },
      error => {
        this.user = error.userData;
      }
    );
  }
}
