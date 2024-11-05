import { OngoingFixture, ResultedFixture } from './../../../models/Fixture';
import { Component, Input } from '@angular/core';
import { Fixture } from '../../../models/Fixture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fixture-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture-results.component.html',
  styleUrl: './fixture-results.component.css'
})
export class FixtureResultsComponent {

  @Input() fixture: Fixture & ResultedFixture | Fixture & OngoingFixture;
  @Input() width: number = 250;

  twoDigitScore(score: number) {
    return score < 10 ? `0${score}` : score;
  }
}
