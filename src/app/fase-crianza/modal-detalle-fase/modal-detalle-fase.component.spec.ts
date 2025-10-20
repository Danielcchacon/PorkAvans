import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleFaseComponent } from './modal-detalle-fase.component';

describe('ModalDetalleFaseComponent', () => {
  let component: ModalDetalleFaseComponent;
  let fixture: ComponentFixture<ModalDetalleFaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleFaseComponent]
    });
    fixture = TestBed.createComponent(ModalDetalleFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
