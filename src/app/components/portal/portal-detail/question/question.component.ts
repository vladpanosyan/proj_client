import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  constructor() {}

  @Input()
  questions: any[];
  ngOnInit() {}
}
