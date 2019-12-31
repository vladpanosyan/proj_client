import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { Router } from "@angular/router";
// import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user;
  currentUser;
  // curentUser;
  constructor(
    private router: Router,
    public authService: UserAuthService) {
      // this.currentUserToken = this.authService.isLoggedIn;
      this.authService.currentUser.subscribe((x: any) => {
        console.log(x, 63636);
        this.currentUser = x;
      });
  }
  ngOnInit() {
    this.user = Math.random();
  }

  logout() {
    console.log(210989);
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
