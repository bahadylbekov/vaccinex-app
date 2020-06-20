import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeTableComponent } from './genome-table.component';

describe('GenomeTableComponent', () => {
  let component: GenomeTableComponent;
  let fixture: ComponentFixture<GenomeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
