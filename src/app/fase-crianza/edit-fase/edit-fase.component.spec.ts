import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaseComponent } from './edit-fase.component';

describe('EditFaseComponent', () => {
  let component: EditFaseComponent;
  let fixture: ComponentFixture<EditFaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFaseComponent]
    });
    fixture = TestBed.createComponent(EditFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
