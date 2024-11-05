import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureResultsComponent } from './fixture-results.component';

describe('FixtureScoreComponent', () => {
  let component: FixtureResultsComponent;
  let fixture: ComponentFixture<FixtureResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
