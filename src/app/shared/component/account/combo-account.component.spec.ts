import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboAccountComponent } from './combo-account.component';

describe('ComboAccountComponent', () => {
  let component: ComboAccountComponent;
  let fixture: ComponentFixture<ComboAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
