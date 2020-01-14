import { Component, OnInit } from "@angular/core";
import { PortalService } from "src/app/services/portal/portal.service";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserAuthService } from "src/app/services/auth/user-auth.service";

@Component({
  selector: "app-cover",
  templateUrl: "./cover.component.html",
  styleUrls: ["./cover.component.css"]
})

// [routerLink]="['/api/portals', item.token]"
export class CoverComponent implements OnInit {
  portalData: any[];

  constructor(
    private userAuthService: UserAuthService,
    private portalService: PortalService,
    private router: Router,
    private nickNameService: NickNameService
  ) {
    this.portalData = [];
    this.portalService.portal.subscribe(portal => {
      this.portalData.push(portal);
    });
  }

  openModal(portalId, token, privatePortal) {
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
                console.log(isValidToken, 999);
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
            try {
              if (!nickNmae) {
                throw new Error("Please enter your nickname");
              }
              const nickname = await this.nickNameService.createNickname(
                nickNmae,
                portalId
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

  ngOnInit() {
    //
    this.portalService.getAll().subscribe(portals => {
      this.portalData = portals;
    });
    //
    this.userAuthService.isAuthenticated().then(result => {
      if (result) {
        console.log(result, 89898989898);
        this.userAuthService.setLogin();
      } else {
        this.userAuthService.setLogOut();
      }
    });
    //
    this.portalService.portalState
    .subscribe(result => {
      if (!result.state) {
        this.portalService
          .chekPortalStatus(result.token)
          .subscribe(status => {
            if (status.private) {
              this.openModal(status.id, status.token, true);
            } else {
              this.openModal(status.id, status.token, false);
            }
          });
      }
    });
    // console.log(this.userAuthService.UserLoggedStatus);
  }
}
