import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";

import { map } from "rxjs/operators";
// import { PreloadAllModules } from '@angular/router';


@Injectable({
  providedIn: "root"
})
export class NickNameService {
  nickDataSubject: BehaviorSubject<any>;
  nickData: Observable<any>;

  currentNickSubjectToken: BehaviorSubject<any>;
  currentNickToken: Observable<any>;

  constructor(private http: HttpClient) {
    this.nickDataSubject = new BehaviorSubject<any>({});
    this.nickData = this.nickDataSubject.asObservable();

    this.currentNickSubjectToken = new BehaviorSubject<any>(localStorage.getItem("nickToken"));
    this.currentNickToken = this.currentNickSubjectToken.asObservable();
  }

  get getNickToken() {
    return this.currentNickSubjectToken.value;
  }

  isSubscriberAuth(portalToken): Observable<any> {
    const nickToken = this.getNickToken;
    if (nickToken) {
      return this.http
      .post("api/nicknames/canactivate", { portalToken, nickToken });
    }
    return of(null);
  }

  isSubAuth(portalId): Promise<any> {
    const nickToken = this.getNickToken;
    if (nickToken) {
      return this.http
      .post("api/nicknames/isLogged", {nickToken, portalId})
      .toPromise();
    }
    return Promise.resolve(null);
  }

  createNickname(nickName, portalId, nickToken): Promise<any> {
    return this.http
      .post("api/nicknames/addNickname", { nickName, portalId, nickToken})
      .pipe(
        map(nick => {
          this.currentNickSubjectToken.next(nick["token"]);
          this.nickDataSubject.next(nick);
          return nick;
        })
      )
      .toPromise();
  }
}
