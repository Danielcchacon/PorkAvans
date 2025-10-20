import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFaseComponent } from './view-fase.component';

describe('ViewFaseComponent', () => {
  let component: ViewFaseComponent;
  let fixture: ComponentFixture<ViewFaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFaseComponent]
    });
    fixture = TestBed.createComponent(ViewFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
