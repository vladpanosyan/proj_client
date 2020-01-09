import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { PortalService } from "src/app/services/portal/portal.service";
import { Observable, Subject, interval } from "rxjs";
import { map, filter, takeUntil } from "rxjs/operators";
// import { formattedError } from '@angular/compiler';
import { timer } from "src/app/HELPERS/backwardTimer";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  started: boolean;
  portal;
  timetoStart = false;
  portalUrlPath = "https://postgroup/portal/";
  portalData: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private portalService: PortalService,
    private router: Router,
    ) {
    this.portalData = [];

    this.portalService.portal.subscribe((x: any) => {
      this.portal = x;
      const StartTime = this.extractStartDate([x]);
      if (!StartTime[0]) {
        return;
      }
      const addedPortal = this.setupTimes([x], StartTime);
      this.portalData.push(addedPortal[0]);
    });
  }
  // extract date from array of portals
  extractStartDate(portals) {
    return portals.reduce((arr, item) => {
      return arr.push(item.start), arr;
    }, []);
  }

  setupTimes(portals, time) {
    console.log(portals, time, 666777666);
    return portals.reduce((arr, element, ind) => {
      const timeStart = element.start;
      const localDate = this.makeCurrentDate(timeStart);
      element.counter = this.initCounter(time[ind]);
      element.start = localDate;
      return arr;
    }, portals);
  }

  makeCurrentDate(time) {
    const date = new Date(time);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatter = new Intl.DateTimeFormat("en-Us", {
      timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    return formatter.format(date);
  }

  initCounter(time) {
    const timer1 = interval(1000).pipe(
      map(_ => {
        const t = this.foo(time);
        if (!(t || this.started)) {
          this.started = true;
          console.log(7777);
          return "Started";
        }
        return t;
      }),
      filter(item => !!item),
      takeUntil(this.destroy$),
    );
    return timer1;
  }

  foo(time) {
    const countDownDate = new Date(time).getTime();
    return timer(countDownDate);
  }

  startEvent(id, token) {
    this.portalService.startEvent(id, token)
    .subscribe(resp => {
      if (resp) {
        this.router.navigate([`api/portals`, id]);
      }
    });
  }

  ngOnInit() {
    this.started = false;
    this.portalData = [];
    // get all portals
    this.portalService.getAll().subscribe(portals => {
      const StartTime = this.extractStartDate(portals);
      this.portalData = this.setupTimes(portals, StartTime);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.complete();
  }
}
