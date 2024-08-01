import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenCollectionsComponent } from './men-collections.component';

describe('MenCollectionsComponent', () => {
  let component: MenCollectionsComponent;
  let fixture: ComponentFixture<MenCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenCollectionsComponent]
    });
    fixture = TestBed.createComponent(MenCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
