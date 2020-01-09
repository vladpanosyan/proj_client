import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDetailComponent } from './portal-detail.component';

describe('PortalDetailComponent', () => {
  let component: PortalDetailComponent;
  let fixture: ComponentFixture<PortalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
