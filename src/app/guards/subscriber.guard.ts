import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { map } from "rxjs/operators";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { Observable, of } from "rxjs";
import { PortalService } from "../services/portal/portal.service";
import { UserAuthService } from "../services/auth/user-auth.service";

@Injectable({
  providedIn: "root"
})
export class SubscriberGuard implements CanActivate {
  constructor(
    private nickService: NickNameService,
    private portalService: PortalService,
    private userAuthService: UserAuthService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // console.log(next, 666);
    if (this.userAuthService.UserLoggedStatus &&
      !this.nickService.getNickToken ||
      this.portalService.isPortalisMakeUser(this.portalService.getPortalId)) {
      return this.userAuthService.isAuthforGuard().pipe(
        map(result => {
          if (result) {
            console.log(result, 9999999);
            return true;
          }
          return false;
        })
      );
    } else {
      return this.nickService.isSubscriberAuth(next.params.token).pipe(
        map(result => {
          if (result) {
            this.nickService.nickDataSubject.next(result);
            return true;
          } else if (result === null) {
            this.portalService.portalStatusSubject.next({token: next.params.token, state: null});
            this.router.navigate(["api/cover"]);
            return false;
          } else {
            this.portalService.portalStatusSubject.next({token: next.params.token, state: false});
            this.router.navigate(["api/cover"]);
            return false;
          }
        })
      );
    }
  }
}
