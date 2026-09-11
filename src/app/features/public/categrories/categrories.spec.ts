import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categrories } from './categories';

describe('Categrories', () => {
  let component: Categrories;
  let fixture: ComponentFixture<Categrories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categrories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categrories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
