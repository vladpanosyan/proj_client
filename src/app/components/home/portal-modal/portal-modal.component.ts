import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { UTCtimeCreator } from "src/app/HELPERS/portalTimeCreator";
import { PortalService } from "src/app/services/portal/portal.service";

@Component({
  selector: "app-portal-modal",
  templateUrl: "./portal-modal.component.html",
  styleUrls: ["./portal-modal.component.css"]
})
export class PortalModalComponent implements OnInit {
  closeResult: string;
  date;
  time;
  currentUser;
  portalForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public authService: UserAuthService,
    public portalService: PortalService,
  ) {
    this.portalForm = this.formBuilder.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      private: null
    });
    this.authService.currentUser.subscribe((x: any) => {
      this.currentUser = x;
    });

  }

  get fx() {
    return this.portalForm.controls;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          // this.closeResult = `Closed with: ${result}`;
          if (result.invalid) {
            return;
          }
          const portalData = result.value;
          const userId = this.currentUser.id;
          const UTCtime = UTCtimeCreator(portalData.date, portalData.time);
          this.portalService.addPortal({start: UTCtime, userId, name: portalData.title, private: +portalData.private})
          .subscribe(portal => console.log(portal, 23323));
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {}
}
