import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoColoresComponent } from './list-colores.component';

describe('ListadoColoresComponent', () => {
  let component: ListadoColoresComponent;
  let fixture: ComponentFixture<ListadoColoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoColoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
