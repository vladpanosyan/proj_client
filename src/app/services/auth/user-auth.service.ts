import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./../../models/user";

@Injectable({
  providedIn: "root"
})
export class UserAuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  // public get isLoggedIn(): boolean {
  //   console.log(!!this.currentUserSubject.value );
  //   return !!this.currentUserSubject.value;
  // }

  // public get currentUserValue(): string { // petq e galu GUARD jamanak, dra hamar e "currentUserSubject" @ndunum voch datark parametr
  //   return this.currentUserSubjectToken.value;
  // }

  login(username: string, password: string) {
    return this.http
      .post<any>(`api/users/login`, { username, password })
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  refresh(data) {
    this.currentUserSubject.next(data);
  }

  // getUserProfile(id): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
