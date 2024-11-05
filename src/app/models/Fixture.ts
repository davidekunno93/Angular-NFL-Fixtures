import { Team } from "./Team";

export type Status = "final" | "upcoming" | "ongoing";
export type Result = {
    homeScore: number;
    awayScore: number;
    winningTeam: "home" | "away" | "tie" | null;
}

export type FixturesData = {
    isLoaded: boolean;
    seasonFixtures: {
        [key: string]: Fixture[]
    };
    numberOfGameWeeks: number;
}
export type Fixture = {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    venue: {
        stadium: string
        city: string
    };
} & (ResultedFixture | UpcomingFixture | OngoingFixture);

export type ResultedFixture = {
    status: "final";
    result: Result;
};

export type UpcomingFixture = {
    status: "upcoming";
    kickoff: {
        formattedDate: string;
        date: string;
        time: string;
    };
};

export type OngoingFixture = {
    status: "ongoing";
    result: Result;
    currentTime: {
        quarter: number
        time: string
    };
}