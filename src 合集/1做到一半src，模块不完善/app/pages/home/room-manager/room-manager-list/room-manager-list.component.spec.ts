import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomManagerListComponent } from './room-manager-list.component';

describe('RoomManagerListComponent', () => {
  let component: RoomManagerListComponent;
  let fixture: ComponentFixture<RoomManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
