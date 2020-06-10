import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigisterModalComponent } from './rigister-modal.component';

describe('RigisterModalComponent', () => {
  let component: RigisterModalComponent;
  let fixture: ComponentFixture<RigisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
