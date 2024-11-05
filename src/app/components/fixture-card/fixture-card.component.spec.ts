import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureCardComponent } from './fixture-card.component';

describe('ResultCardComponent', () => {
  let component: FixtureCardComponent;
  let fixture: ComponentFixture<FixtureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
