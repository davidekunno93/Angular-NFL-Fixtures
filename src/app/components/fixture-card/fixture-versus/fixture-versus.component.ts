import { Component, Input } from '@angular/core';
import { Fixture } from '../../../models/Fixture';
import { FixtureResultsComponent } from '../fixture-results/fixture-results.component';

@Component({
  selector: 'app-fixture-versus',
  standalone: true,
  imports: [FixtureResultsComponent],
  templateUrl: './fixture-versus.component.html',
  styleUrl: './fixture-versus.component.css'
})
export class FixtureVersusComponent {
  @Input() fixture: Fixture;

  convertRecord(wins: number, losses: number, ties: number) {
    // converts entered wins, losses, ties to "(W-L-T)" format
    if (ties === 0) {
      return `(${wins}-${losses})`;
    } else {
      return `(${wins}-${losses}-${ties})`;
    };
  };

}
