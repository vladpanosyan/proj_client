import { Component, OnInit } from "@angular/core";
import { PortalService } from "src/app/services/portal/portal.service";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { ChatService } from "src/app/services/chat/chat.service";
@Component({
  selector: "app-cover",
  templateUrl: "./cover.component.html",
  styleUrls: ["./cover.component.css"]
})

// [routerLink]="['/api/portals', item.token]"
export class CoverComponent implements OnInit {
  portalData: any[];
  currentUserPortals: any[];
  constructor(
    private userAuthService: UserAuthService,
    private portalService: PortalService,
    private router: Router,
    private nickNameService: NickNameService,
    private chatService: ChatService
  ) {
    this.portalData = [];
    this.currentUserPortals = [];
    this.portalService.portal.subscribe(portal => {
      this.portalData.push(portal);
    });
  }

  async openModal(portalId, token, privatePortal, creatorId) {
    this.portalService.currentPortalIdSubject.next(portalId);
    const userId = this.userAuthService.currentUserValue &&  this.userAuthService.currentUserValue.id;
    const issubLoggedIn = await this.nickNameService.isSubAuth(portalId);

    if (issubLoggedIn && issubLoggedIn.currentNicId || userId === creatorId) {
      this.router.navigate(["api/portals", token]);
    } else if (issubLoggedIn === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "false token!",
        footer: "<a href>Why do I have this issue?</a>"
      });
    } else {
      Swal.mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1", "2"]
      })
        .queue([
          {
            title: "Step 1",
            text: !privatePortal
              ? "Press Next Button To Continue"
              : "Enter your subscribtion token",
            showLoaderOnConfirm: true,
            inputValue: !privatePortal && token,
            // tslint:disable-next-line: no-shadowed-variable
            preConfirm: async token => {
              try {
                const isValidToken = await this.portalService.checkPermision(
                  token,
                  portalId
                );
                if (!isValidToken.ok) {
                  throw new Error(isValidToken.textContent);
                }
                return isValidToken;
              } catch (error) {
                Swal.showValidationMessage(`Access failed: ${error.message}`);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          },
          {
            title: "Step 2",
            text: "Ente your Nickname identify",
            showLoaderOnConfirm: true,
            preConfirm: async nickNmae => {
              const nickToken = this.nickNameService.getNickToken;
              try {
                if (!nickNmae) {
                  throw new Error("Please enter your nickname");
                }
                const nickname = await this.nickNameService.createNickname(
                  nickNmae,
                  portalId,
                  nickToken
                );
                if (!nickname.id) {
                  throw new Error(nickname.textContent);
                }
                return nickname;
              } catch (error) {
                Swal.showValidationMessage(`Access failed: ${error.message}`);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }
        ])
        // .then(async result => {
        //   console.log(result, 1111111);
        //   return result;
        // })
        .then(async result => {
          if (result.value) {
            await Swal.fire({
              title: "All done!",
              html: `Dear ${result.value[1].name} you succesfully Registered`,
              confirmButtonText: "Let's Start!"
            });
            // console.log(window.atob(result.value[1].token.split(".")[1]), 888);
            localStorage.setItem("nickToken", result.value[1].token);
            this.router.navigate(["api/portals", token]);
          }
        });
    }
  }

// lll() {
//   console.log(898989)
// }

  ngOnInit() {
    //
    console.log('inside cover component')
    this.chatService.refreshPortals.subscribe(_ => {
      this.portalService.getAll().subscribe(portals => {
        this.portalData = portals;
      });
    });
    //
    this.portalService.getAll().subscribe(portals => {
      this.portalData = portals;
    });
    //
    this.userAuthService.isAuthenticated().then(result => {
      if (result) {
        this.userAuthService.setLogin();
      } else {
        this.userAuthService.setLogOut();
      }
    });
    //
    this.portalService.portalState.subscribe(result => {
      if (result.state === null) {
        this.portalService.chekPortalStatus(result.token).subscribe(status => {
          if (status.private) {
            this.openModal(status.id, status.token, true, status.userId);
          } else {
            this.openModal(status.id, status.token, false, status.userId);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "??????????????!",
          footer: "<a href>Why do I have this issue?</a>"
        });
      }
    });
    //
    const userId = this.userAuthService.currentUserValue &&  this.userAuthService.currentUserValue.id;
    if (userId) {
      this.portalService.getUserPortals(userId)
      .subscribe(portals => {
        this.currentUserPortals = portals;
      });
    }
    // console.log(this.userAuthService.UserLoggedStatus);
  }
}
