import { Injectable } from "@angular/core";
import { UserService } from "./../user/user.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(private user: UserService) {}

  handleError(error: HttpErrorResponse) {
    console.log(error.error);
    if (error.status === 501) {

      // return throwError(this.user.execption());
      //     oR
    return throwError(error.error);
    }
    const err = error.error.message || error.statusText;
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }

}
