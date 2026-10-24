
import { TestBed } from '@angular/core/testing';
import { AdminPrestamoService } from './admin-prestamo';

describe('AdminPrestamo', () => {
  let service: AdminPrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
