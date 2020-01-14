import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { map } from "rxjs/operators";
import { NickNameService } from "src/app/services/nickName/nick-name.service";
import { Observable } from "rxjs";
import { PortalService } from "../services/portal/portal.service";

@Injectable({
  providedIn: "root"
})
export class SubscriberGuard implements CanActivate {
  constructor(
    private nickService: NickNameService,
    private portalService: PortalService,
    private router: Router
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.nickService.isSubscriberAuth().pipe(
      map(result => {
        if (result) {
          console.log(result, 777);
          alert(888);
          this.nickService.nickDataSubject.next(result);
          return true;
        } else {
          // alert(next.params.token);

          // this.portalService.chekPortalStatus(next.params.token)
          // .subscribe(status => console.log(status, 999888999));

          this.portalService.portalStatusSubject.next({token: next.params.token, state: false});
          this.router.navigate(["api/cover"]);
          return false;
        }
      })
    );
  }
}
