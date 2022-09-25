import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMarcasComponent } from './list.component';

describe('ListadoMarcasComponent', () => {
  let component: ListadoMarcasComponent;
  let fixture: ComponentFixture<ListadoMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
