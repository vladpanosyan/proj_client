import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  data: Observable<User>;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    ) {}

  ngOnInit() {
   this.data = this.userService.getUserProfile(this.route.snapshot.paramMap.get("id"));
    // .subscribe(data => {
    //   console.log(data);
    //   this.data = data;
    // });
  }
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  time: string;
  img: string;
}
