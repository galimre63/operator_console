import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpConsComponent } from './opcons.component';

describe('ConsoleComponent', () => {
  let component: OpConsComponent;
  let fixture: ComponentFixture<OpConsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpConsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
