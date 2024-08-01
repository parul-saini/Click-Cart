import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemailComponent } from './foremail.component';

describe('ForemailComponent', () => {
  let component: ForemailComponent;
  let fixture: ComponentFixture<ForemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForemailComponent]
    });
    fixture = TestBed.createComponent(ForemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
