import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PortalService {
  portalSubject: BehaviorSubject<any>;
  portal: Observable<any>;

  constructor(private http: HttpClient) {
    this.portalSubject = new BehaviorSubject<any>({});
    this.portal = this.portalSubject.asObservable();
  }

  addPortal(data: any): Observable<any> {
    return this.http
      .post<any>("api/portals/addPortal", data)
      .pipe(map(portal => this.portalSubject.next(portal)));
  }
  startEvent(id, token): Observable<any> {
    return this.http
    .put<any>(`api/portals/${token}`, {id}); // xi token@ query.param ???
  }

  checkPermision(token): Promise<any> {
    return this.http
    .post(`api/portals/checkToken`, { token })
    .toPromise();
  }

  getAll(): Observable<any> {
    return this.http
    .get("api/portals/getAll");
  }

  getActivePortal() {
    return this.http
    .get("api/portals/active");
  }
}
