import { Component, Input } from '@angular/core';
import { Fixture } from '../../models/Fixture';
import { FixtureResultsComponent } from './fixture-results/fixture-results.component';
import { FixtureVersusComponent } from './fixture-versus/fixture-versus.component';

@Component({
  selector: 'app-fixture-card',
  standalone: true,
  imports: [FixtureResultsComponent, FixtureVersusComponent],
  templateUrl: './fixture-card.component.html',
  styleUrl: './fixture-card.component.css'
})
export class FixtureCardComponent {
  @Input() fixture: Fixture;

}
