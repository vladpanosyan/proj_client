import { Component, OnInit, OnDestroy } from "@angular/core";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { ChatService } from "src/app/services/chat/chat.service";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { PortalService } from "src/app/services/portal/portal.service";
import { QuestionService } from "src/app/services/question/question.service";

import { Subject, Observable} from "rxjs";
import { takeUntil, map } from "rxjs/operators";

@Component({
  selector: "app-portal-detail",
  templateUrl: "./portal-detail.component.html",
  styleUrls: ["./portal-detail.component.css"]
})
export class PortalDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  nickData: any;
  userData: any;
  messages: any[] = [];
  answers: any = [];
  inUserPortal = false;
  token = "";

kkk = 1;

  constructor(
    private nickService: NickNameService,
    private userAuthService: UserAuthService,
    private chatService: ChatService,
    private portalService: PortalService,
    private questionService: QuestionService

  ) {
    this.nickService.currentNickToken.subscribe(token => (this.token = token));
  }

  ngOnInit() {
    this.nickService.nickData.subscribe(data => (this.nickData = data));

    this.userData = this.userAuthService.currentUserValue;

    if (
      this.userAuthService.UserLoggedStatus &&
      this.portalService.isPortalisMakeUser(this.portalService.getPortalId)
    ) {
      this.inUserPortal = true;
      this.chatService.answerQuestion
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(answer => {
          alert(10);
          this.answers.push(answer);
        });
    } else {
      this.inUserPortal = false;
      this.chatService.message
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(message => {
          // this.messages.push(message);
          this.questionService.msg.next(message);
          console.log(this.messages);
        });
    }

    // check subscriber authorization
    // this.nickService.isSubscriberAuth()
    // .subscribe(x => this.nickData = x);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
