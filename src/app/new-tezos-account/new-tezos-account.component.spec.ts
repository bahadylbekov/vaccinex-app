import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTezosAccountComponent } from './new-tezos-account.component';

describe('NewTezosAccountComponent', () => {
  let component: NewTezosAccountComponent;
  let fixture: ComponentFixture<NewTezosAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTezosAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTezosAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
