import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInventarioComponent } from './card-inventario.component';

describe('CardProductsComponent', () => {
  let component: CardInventarioComponent;
  let fixture: ComponentFixture<CardInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardInventarioComponent]
    });
    fixture = TestBed.createComponent(CardInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
