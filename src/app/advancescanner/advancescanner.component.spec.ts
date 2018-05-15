import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancescannerComponent } from './advancescanner.component';

describe('AdvancescannerComponent', () => {
  let component: AdvancescannerComponent;
  let fixture: ComponentFixture<AdvancescannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancescannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancescannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
