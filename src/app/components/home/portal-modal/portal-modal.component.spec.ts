import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalModalComponent } from './portal-modal.component';

describe('PortalModalComponent', () => {
  let component: PortalModalComponent;
  let fixture: ComponentFixture<PortalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
