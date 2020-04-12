import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IVRConsoleComponent } from './ivrconsole.component';

describe('IVRConsoleComponent', () => {
  let component: IVRConsoleComponent;
  let fixture: ComponentFixture<IVRConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IVRConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IVRConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
