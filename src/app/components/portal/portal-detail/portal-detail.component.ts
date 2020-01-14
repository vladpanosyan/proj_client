import { Component, OnInit } from "@angular/core";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { ChatService } from "src/app/services/chat/chat.service";

@Component({
  selector: "app-portal-detail",
  templateUrl: "./portal-detail.component.html",
  styleUrls: ["./portal-detail.component.css"]
})
export class PortalDetailComponent implements OnInit {
  nickData: any;
  messages: any[] = [];
  token = "";
  constructor(
    private nickService: NickNameService,
    private chatService: ChatService,
    ) {
      this.nickService.currentNickToken
        .subscribe(token => this.token = token);
    }

  ngOnInit() {
    this.nickService.nickData
    .subscribe(data => this.nickData = data);

    this.chatService.message
    .subscribe(message => this.messages.push(message));

    // check subscriber authorization
    // this.nickService.isSubscriberAuth()
    // .subscribe(x => this.nickData = x);
  }
}
