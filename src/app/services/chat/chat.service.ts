import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Subject, Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ChatService {
  likeCountSubject: Subject<any>;
  likeCountSubscrbtion: Observable<any>;
  message = this.socket.fromEvent("message");
  answerQuestion = this.socket.fromEvent("answ_message");
  refreshPortals = this.socket.fromEvent("showPortals");
  constructor(
    private socket: Socket
    ) {
    // this.socket.connect();
    this.likeCountSubject = new Subject();
    this.likeCountSubscrbtion = this.likeCountSubject.asObservable();
  }

  addLikeCount() {
    this.socket.on("sendLikesCount", (data) => {
      this.likeCountSubject.next(data);
    });
  }

  sendLikeCount(data, action) {
    // alert(JSON.stringify(data));
    this.socket.emit("get_likes_count", data, action);
  }

  sendMessage(nickData) {
    delete nickData.nickToPortal;
    this.socket.emit("send_message", nickData);
  }

  answQuestion(answer) {
    this.socket.emit("send_question", answer);
  }
}
