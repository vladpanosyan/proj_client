import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  execption() {
    return "its workikng";
  }
  getUser() {
    return this.http.get("api/users");
  }

  AddUser(user: any): Observable<any> {
    console.log(77777);
    return this.http.post("api/users/register", user);
  }

  addToken(name: string, user: any): void {
    localStorage.setItem(name, JSON.stringify(user));
  }

  getUserProfile(id: string): Observable<any> {
    return this.http.get(`api/users/profile/${id}`);
  }
 }
