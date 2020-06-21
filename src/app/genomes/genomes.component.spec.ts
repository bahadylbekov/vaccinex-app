import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomesComponent } from './genomes.component';

describe('GenomesComponent', () => {
  let component: GenomesComponent;
  let fixture: ComponentFixture<GenomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
