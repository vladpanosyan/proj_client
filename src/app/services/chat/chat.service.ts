import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root"
})
export class ChatService {

  message = this.socket.fromEvent("message");

  constructor(private socket: Socket) {
    // this.socket.connect();
  }

  sendMessage(message) {
    this.socket.emit("send_message", message);
  }
}
