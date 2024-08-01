import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsellersComponent } from './viewsellers.component';

describe('ViewsellersComponent', () => {
  let component: ViewsellersComponent;
  let fixture: ComponentFixture<ViewsellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsellersComponent]
    });
    fixture = TestBed.createComponent(ViewsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
