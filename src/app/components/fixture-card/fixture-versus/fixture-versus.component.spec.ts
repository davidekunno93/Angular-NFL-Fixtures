import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureVersusComponent } from './fixture-versus.component';

describe('FixtureVersusComponent', () => {
  let component: FixtureVersusComponent;
  let fixture: ComponentFixture<FixtureVersusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureVersusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureVersusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
