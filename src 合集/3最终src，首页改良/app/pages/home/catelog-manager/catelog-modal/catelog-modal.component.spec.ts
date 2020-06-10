import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogModalComponent } from './catelog-modal.component';

describe('CatelogModalComponent', () => {
  let component: CatelogModalComponent;
  let fixture: ComponentFixture<CatelogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
