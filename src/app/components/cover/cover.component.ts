import { Component, OnInit } from "@angular/core";
import { PortalService } from "src/app/services/portal/portal.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-cover",
  templateUrl: "./cover.component.html",
  styleUrls: ["./cover.component.css"]
})
export class CoverComponent implements OnInit {
  portalData: any[];
  constructor(
    private portalService: PortalService,
    private router: Router
    ) {
    this.portalData = [];
    this.portalService.portal.subscribe(portal => {
      this.portalData.push(portal);
    });
  }

  openModal(portalId) {
    Swal.fire({
      title: "Submit your participation token",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: token => {
        return this.portalService.checkPermision(token)
        .then(response => {
            if (!response.ok) {
              throw new Error(response.textContent);
            }
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(`Access failed: ${error.message}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async result => {
      if (result.value) {
        await Swal.fire({
          title: `You submited ${result.value.textContent}`,
          // imageUrl: result.value.avatar_url
        });
        this.router.navigate(["api/portals", portalId]);
      }
    });
  }

  ngOnInit() {
    this.portalService.getAll().subscribe(portals => {
      this.portalData = portals;
    });
  }
}
