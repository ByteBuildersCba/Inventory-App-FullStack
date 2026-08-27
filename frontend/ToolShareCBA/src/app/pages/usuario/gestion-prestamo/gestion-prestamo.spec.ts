import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionPrestamo } from './gestion-prestamo';

describe('GestionPrestamo', () => {
  let component: GestionPrestamo;
  let fixture: ComponentFixture<GestionPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPrestamo],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPrestamo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
