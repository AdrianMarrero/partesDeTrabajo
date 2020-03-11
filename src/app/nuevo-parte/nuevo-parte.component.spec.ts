import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoParteComponent } from './nuevo-parte.component';

describe('NuevoParteComponent', () => {
  let component: NuevoParteComponent;
  let fixture: ComponentFixture<NuevoParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
