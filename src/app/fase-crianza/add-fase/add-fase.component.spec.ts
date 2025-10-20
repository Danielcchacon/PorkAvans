import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaseComponent } from './add-fase.component';

describe('AddFaseComponent', () => {
  let component: AddFaseComponent;
  let fixture: ComponentFixture<AddFaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFaseComponent]
    });
    fixture = TestBed.createComponent(AddFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
