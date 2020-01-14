import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { Router } from "@angular/router";
// import { AuthService } from "angularx-social-login";
// import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  currentUser;
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    public authService: UserAuthService,
    ) {
      this.authService.currentUser.subscribe((x: any) => {
        this.currentUser = x;
      });
      this.authService.isLoggedIn.subscribe((x: boolean) => {
        this.isLoggedIn = x;
      });
  }
  ngOnInit() {
  }

  logout() {
    alert(210989);
    this.authService.logout();
    // this.socialAuthService.signOut();
    this.router.navigate(["/"]);
  }
}
