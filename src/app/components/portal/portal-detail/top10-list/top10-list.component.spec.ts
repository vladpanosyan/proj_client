import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10ListComponent } from './top10-list.component';

describe('Top10ListComponent', () => {
  let component: Top10ListComponent;
  let fixture: ComponentFixture<Top10ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
