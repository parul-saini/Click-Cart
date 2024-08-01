import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCollectionsComponent } from './children-collections.component';

describe('ChildrenCollectionsComponent', () => {
  let component: ChildrenCollectionsComponent;
  let fixture: ComponentFixture<ChildrenCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCollectionsComponent]
    });
    fixture = TestBed.createComponent(ChildrenCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
