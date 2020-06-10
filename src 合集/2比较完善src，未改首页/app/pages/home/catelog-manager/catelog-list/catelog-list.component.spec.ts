import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogListComponent } from './catelog-list.component';

describe('CatelogListComponent', () => {
  let component: CatelogListComponent;
  let fixture: ComponentFixture<CatelogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
