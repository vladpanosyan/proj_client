import { Component, OnInit, Input } from "@angular/core";
import { ChatService } from "src/app/services/chat/chat.service";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { PortalService } from "src/app/services/portal/portal.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})

export class MessageComponent implements OnInit {
  @Input() userData: any;
  @Input() nickData: any;

isUserInSelfPortal: boolean;

  constructor(
    private chatService: ChatService,
    private userAuthService: UserAuthService,
    private portalService: PortalService,
    ) {}

  message = "";

//  for subscriber
  sendMessage(message) {
    const nickDataClone = {...this.nickData};
    nickDataClone.message = message;
    nickDataClone.time = new Date();
    this.chatService.sendMessage(nickDataClone);
    this.message = "";
  }

  // for user
  sendMessgeQuestion(answer) {
    this.chatService.answQuestion(answer);
    this.message = "";
  }

  ngOnInit() {
    this.isUserInSelfPortal = this.userAuthService.UserLoggedStatus &&
    this.portalService.isPortalisMakeUser(this.portalService.getPortalId);
  }
}
