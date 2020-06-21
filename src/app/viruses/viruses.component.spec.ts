import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusesComponent } from './viruses.component';

describe('VirusesComponent', () => {
  let component: VirusesComponent;
  let fixture: ComponentFixture<VirusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
