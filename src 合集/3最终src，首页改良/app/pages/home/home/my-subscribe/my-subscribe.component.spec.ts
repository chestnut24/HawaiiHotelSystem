import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscribeComponent } from './my-subscribe.component';

describe('MySubscribeComponent', () => {
  let component: MySubscribeComponent;
  let fixture: ComponentFixture<MySubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
