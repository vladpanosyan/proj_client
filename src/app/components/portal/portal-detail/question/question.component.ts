import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "src/app/services/question/question.service";
import { ActivatedRoute } from "@angular/router";
import { extractLikes } from "src/app/HELPERS/extractLikes";
import { ChatService } from "src/app/services/chat/chat.service";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  portalToken: string;
  questions: any[] = [];
  isLiked = false;
  constructor(
    private questionService: QuestionService,
    private chatServise: ChatService,
    private route: ActivatedRoute
  ) {
    const portalToken = this.route.snapshot.paramMap.get("token");
    this.portalToken = portalToken;
  }

  @Input() question: any[];
  @Input() nickData: any;
  @Input() userData: any;
  @Input() inUserPortal: boolean;

  get currUserID() {
    return this.inUserPortal ? this.userData.id : this.nickData.id;
  }

  action(item, i) {
    const us_erID = this.currUserID;
    if (item.isLiked) {
      item.isLiked = false;
      item.isClicked = true;
      console.log("click-Minus");
      const t = extractLikes(item);
      console.log(t, 777);
      item.likes = t - 1;
      console.log(item.likes, 8888);
      this.chatServise.sendLikeCount({index: i, likes: t - 1,  nicknameId: us_erID, questionId: item.id}, "minus");
    } else {
      item.isLiked = true;
      item.isClicked = false;
      const t = extractLikes(item);
      item.likes = t + 1;
      console.log(item.likes, 9999);
      // alert(555)
      console.log("click-Plus");
      this.chatServise.sendLikeCount({index: i, likes: t + 1,  nicknameId: us_erID, questionId: item.id}, "plus");
    }
  }

  // if user or subscriber are liked a question
  isNickLiked(questionItem) {
    const us_erID = this.currUserID;
    const value = questionItem.questionLikers ? questionItem.questionLikers.some(item => {
      return item === us_erID;
    }) : false;
  //   // console.log(questionItem.isLiked, 5566);
    if (value && !questionItem.isClicked) {
      questionItem.isLiked = true;
      return value;
    } else if (value && questionItem.isClicked) {
      questionItem.isLiked = false;
      return false;
    } else {
      questionItem.isLiked = false;
      return false;
    }

  }

  ngOnInit() {
    this.questionService
      .getAllQuestions(this.portalToken)
      .subscribe(questions => {
        console.log(questions, 210989);
        this.questions = questions;
        // this.questions.concat(this.question);
    });
    this.chatServise.addLikeCount();
    this.chatServise.likeCountSubscrbtion.subscribe(data => {
      // console.log(data, 555222111);
      this.questions[data.index].likes = data.likes;
    });
    this.questionService.getMsg.subscribe(message => {
      this.questions.push(message);
    });
  }
}

// partadir destroy ara bolor subscribtion unsub anelu hamar
