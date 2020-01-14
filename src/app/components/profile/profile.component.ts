import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { ActivatedRoute } from "@angular/router";

// import { Observable } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  data: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) {
    const userId = this.route.snapshot.paramMap.get("id");
    // const userToken = this.route.snapshot.paramMap.get("token");

    if (userId) {
      this.userService.getUserProfile(userId).subscribe(data => {
        console.log(data);
        this.data = data;
      });
    }
    // if (userToken) {
    //   this.userService.addToken("access_token", userToken);
    //   this.userService.getUserProfileSocial(userToken).subscribe(data => {
    //     console.log(data, 93939393939);
    //     this.data = data;
    //   });
    // }
  }

  ngOnInit() {
  }
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  time?: string;
  img?: string;
}
