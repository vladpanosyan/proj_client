import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { UserService } from "src/app/services/user/user.service";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submited: false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  userLogin() {
    const {email, password } = this.loginForm.value;
    this.userAuthService.login(email, password)
    .subscribe(user => this.router.navigate(["api/users/profile", user.id]));
  }

  detectClass(field) {
    if (
      this.loginForm.controls[field].dirty &&
      this.loginForm.controls[field].invalid
    ) {
      return "no_valid";
    } else if (
      this.loginForm.controls[field].dirty &&
      this.loginForm.controls[field].valid
    ) {
      return "is_valid";
    }
  }
}
