import { Component, inject, OnInit } from '@angular/core';
import { FixtureCardComponent } from "../components/fixture-card/fixture-card.component";
import { Fixture, FixturesData, Status } from '../models/Fixture';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FixtureCardComponent, DropdownComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // helper variables & functions
  gIcon = "material-symbols-outlined";
  convertStatusFormat = (status: string): string => {
    status = status.toLowerCase() === "upcoming" ? "upcoming" : status.toLowerCase() === "resulted" ? "final" : "ongoing";
    return status;
  };


  // get fixtures from api
  httpClient = inject(HttpClient);
  getFixtures() {
    return lastValueFrom(
      this.httpClient
        .get('https://monkfish-app-ohv8p.ondigitalocean.app/nfl/current-season-schedule')
    );
  };
  loadFixtures = async () => {
    let data: any = await this.getFixtures();
    const fixtureWeeks = data.weeks;
    // organize data into fixture state
    for (let i = 0; i < fixtureWeeks.length; i++) {
      let weekNumber: string = (i + 1).toString();
      let gameWeekId: string = `game-week-${weekNumber}`;
      let fixtureWeek: Fixture[] = [];
      for (let j = 0; j < fixtureWeeks[i].games.length; j++) {
        const fixtureData = fixtureWeeks[i].games;
        let homeTeamNameArray = fixtureData[j].home.name.split(" ");
        let awayTeamNameArray = fixtureData[j].away.name.split(" ");
        let dateAndTime = this.apiHelper.convertDateAndTime(fixtureData[j].scheduled);
        let fixture: Fixture = {
          id: gameWeekId + `-${j + 1}`,
          homeTeam: {
            abbreviation: fixtureData[j].home.alias,
            name: fixtureData[j].home.name,
            nickname: homeTeamNameArray[homeTeamNameArray.length - 1],
            record: fixtureData[j].home.record,
            logoUrl: this.apiHelper.getTeamLogoUrl(fixtureData[j].home.alias),
          },
          awayTeam: {
            abbreviation: fixtureData[j].away.alias,
            name: fixtureData[j].away.name,
            nickname: awayTeamNameArray[awayTeamNameArray.length - 1],
            record: fixtureData[j].away.record,
            logoUrl: this.apiHelper.getTeamLogoUrl(fixtureData[j].away.alias),
          },
          venue: {
            stadium: fixtureData[j].venue.name,
            city: fixtureData[j].venue.city,
          },
          status: this.apiHelper.getStatus(fixtureData[j].status),
          kickoff: {
            formattedDate: dateAndTime.formattedDate,
            date: dateAndTime.date,
            time: dateAndTime.time,
          },

          result: {
            homeScore: this.apiHelper.getStatus(fixtureData[j].status) !== "upcoming" ? fixtureData[j].scoring.home_points : null,
            awayScore: this.apiHelper.getStatus(fixtureData[j].status) !== "upcoming" ? fixtureData[j].scoring.away_points : null,
            winningTeam: this.apiHelper.getStatus(fixtureData[j].status) !== "upcoming" ? fixtureData[j].scoring.home_points === fixtureData[j].scoring.away_points ? "tie" : (fixtureData[j].scoring.home_points > fixtureData[j].scoring.away_points ? "home" : "away") : null,
          },
          currentTime: {
            quarter: this.apiHelper.getStatus(fixtureData[j].status) === "ongoing" ? fixtureData[j].current_quarter : null,
            time: this.apiHelper.getStatus(fixtureData[j].status) === "ongoing" ? fixtureData[j].current_time : null
          }
        };
        fixtureWeek.push(fixture);
      }
      Object.assign(this.fixturesData.seasonFixtures, { [gameWeekId]: fixtureWeek })
    }
    this.fixturesData.isLoaded = true;
    this.filteredFixtures = Object.values(this.fixturesData.seasonFixtures)[3];
  };
  apiHelper = {
    getTeamLogoUrl: function (abbreviation: string): string {
      const logos: any = {
        "ARI": "https://i.imgur.com/owr4sHA.png",
        "ATL": "https://i.imgur.com/Ty9SYKq.png",
        "BAL": "https://i.imgur.com/zjHXMPn.png",
        "BUF": "https://i.imgur.com/Gbb319x.png",
        "CAR": "https://i.imgur.com/GP80IDH.png",
        "CHI": "https://i.imgur.com/3onpyjP.png",
        "CIN": "https://i.imgur.com/Jyo6LBi.png",
        "CLE": "https://i.imgur.com/NJvgdub.png",
        "DAL": "https://i.imgur.com/suuw6hv.png",
        "DEN": "https://i.imgur.com/Qhx8uq0.png",
        "DET": "https://i.imgur.com/VzwzQ0i.png",
        "GB": "https://i.imgur.com/57lbtPQ.png",
        "HOU": "https://i.imgur.com/xQ3n0Gc.png",
        "IND": "https://i.imgur.com/vOGD12O.png",
        "JAC": "https://i.imgur.com/XM1pl8M.png",
        "JAX": "https://i.imgur.com/XM1pl8M.png",
        "KC": "https://i.imgur.com/1PpNDCt.png",
        "LAC": "https://i.imgur.com/SpCTYzG.png",
        "LA": "https://i.imgur.com/63jim0e.png",
        "LV": "https://i.imgur.com/D8WTAIT.png",
        "MIA": "https://i.imgur.com/LZD4BkH.png",
        "MIN": "https://i.imgur.com/MCxMEvg.png",
        "NE": "https://i.imgur.com/LPIhBzO.png",
        "NO": "https://i.imgur.com/u5kQJ1D.png",
        "NYG": "https://i.imgur.com/DQFumVx.png",
        "NYJ": "https://i.imgur.com/E64YCS9.png",
        "PHI": "https://i.imgur.com/Jg5IVle.png",
        "PIT": "https://i.imgur.com/5xotKSm.png",
        "SEA": "https://i.imgur.com/ITwekU8.png",
        "SF": "https://i.imgur.com/FW6KfUC.png",
        "TB": "https://i.imgur.com/7I2LSUK.png",
        "TEN": "https://i.imgur.com/GbGBtc2.png",
        "WAS": "https://i.imgur.com/ldl4LPU.png",
      };
      return logos[abbreviation];
    },
    getStatus: function (status: string): Status {
      const statusMap: any = {
        "closed": "final",
        "scheduled": "upcoming",
      }
      return statusMap[status];
    },
    convertDateAndTime: function (systemDateAndTime: string) {
      // converts api system date and time to "MM-DD-YYYY", "Month Day, Year" and "HH:MMAM/PM") format
      const systemDate = systemDateAndTime.slice(0, 10);
      const systemTime = systemDateAndTime.slice(11, 16);

      // get date (MM-DD-YYYY)
      const month = systemDate.slice(5, 7);
      const day = parseInt(systemDate.slice(8, 10)).toString();
      const year = systemDate.slice(0, 4);
      const date = `${month}-${day}-${year}`;

      // get formatted date (Month Day, Year)
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const monthName = monthNames[parseInt(month) - 1];
      const formattedDate = `${monthName} ${day}, ${year}`;

      // get time (HH:MMAM/PM)
      let hour = parseInt(systemTime.slice(0, 2)).toString();
      const minutes = systemTime.slice(3, 5);
      const amOrPm = parseInt(hour) >= 12 ? "PM" : "AM";
      if (parseInt(hour) > 12) {
        hour = (parseInt(hour) - 12).toString();
      } else if (parseInt(hour) === 0) {
        hour = "12";
      };
      const time = `${hour}:${minutes}${amOrPm}`;

      return {
        date: date,
        formattedDate: formattedDate,
        time: time,
      };
    },
  };

  // state variables
  fixturesData: FixturesData = {
    isLoaded: false,
    seasonFixtures: {},
    numberOfGameWeeks: 5,
  };
  fixturesOptions = {
    gameWeek: "4",
    status: "All",
    searchQuery: "",
  };
  filteredFixtures: Fixture[] = [];

  // filtering options
  filterOptions = {
    title: "Filter Games",
    items: ["All", "Ongoing", "Upcoming", "Resulted"],
    selectedItem: "All",
  }
  gameWeekOptions = {
    title: "Game Week",
    items: ["1", "2", "3", "4", "5"],
    selectedItem: "4",
  }
  searchQuery = "";


  // filtering functions
  filterFixtures(gameWeek: string, status: string, searchQuery: string) {
    // only run if gameWeek, status or searchQuery has changed
    if (gameWeek !== `game-week-${this.fixturesOptions.gameWeek}` || status !== this.fixturesOptions.status || searchQuery !== this.fixturesOptions.searchQuery) {
      // update fixtures options (reference for updates in gameWeek, status or searchQuery)
      this.fixturesOptions.gameWeek = gameWeek.split("-")[2];
      this.fixturesOptions.status = status;
      this.fixturesOptions.searchQuery = searchQuery;

      // select gameWeek and filter status
      let filteredResults = this.fixturesData.seasonFixtures[gameWeek].filter(fixture => status === "All" ? true : fixture.status === this.convertStatusFormat(status));

      // filter search query (is search query in home/away team names)
      filteredResults = filteredResults.filter(function (fixture) {
        if (searchQuery === "") {
          return true;
        } else {
          return fixture.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) || fixture.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase());
        };
      })
      this.filteredFixtures = filteredResults;
    };
  };
  updateFilteredFixtures() {
    this.filterFixtures(`game-week-${this.gameWeekOptions.selectedItem}`, this.filterOptions.selectedItem, this.searchQuery);
  };



  ngOnInit(): void {
    this.loadFixtures();
  };
}
