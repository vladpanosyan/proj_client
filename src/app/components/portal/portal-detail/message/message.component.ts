import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat/chat.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  message = "";
  sendMessage(message) {
    this.chatService.sendMessage(message);
    this.message = "";
  }
  kkk() {
    alert("good");
  }
  ngOnInit() {}
}
