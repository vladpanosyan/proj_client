import { Component, OnInit } from "@angular/core";
import { PortalService } from "src/app/services/portal/portal.service";

@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.css"]
})
export class PortalComponent implements OnInit {

  portal;
  constructor(
    private portalService: PortalService
  ) {}

  ngOnInit() {
    this.portalService.getActivePortal()
    .subscribe(portal => {
      this.portal = portal;
      console.log(portal);
    });
  }
}
