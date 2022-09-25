import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoresFormComponent } from './form-colores.component';

describe('FormComponent', () => {
  let component: ColoresFormComponent;
  let fixture: ComponentFixture<ColoresFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoresFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
