import { Component, OnInit } from "@angular/core";
import { fromEvent } from "rxjs";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
// import { UserAuthService } from "src/app/services/user/user.service";
// services
// import { UserAuthService } from "./services/auth/user-auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private socket: Socket
    ) {
    // const source = fromEvent(window, "storage");
    // // source.pipe(map(event => ))
    // source.subscribe( (e: any) => {
    //   // if (!e.key && !e.newValue) {
    //   //   this.userAuthService.logout();
    //   //   this.userAuthService.signOut();
    //   // }
    //   console.log(e, 23232323);
    // });
  }
  ngOnInit() {
    this.socket.connect();
  }
}
