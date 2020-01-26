import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class QuestionService {

  // for new create message

  msg = new Subject();
  getMsg: Observable<any>;

  constructor(private http: HttpClient) {
    this.getMsg = this.msg.asObservable();
  }

  getAllQuestions(portalToken): Observable<any> {
    return this.http
    .get(`api/questions/getAll/${portalToken}`);
  }
}
