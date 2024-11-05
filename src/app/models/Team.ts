export type Team = {
    abbreviation: string;
    name: string;
    nickname: string;
    record: {
        wins: number;
        losses: number;
        ties: number;
        win_pct: string;
    };
    logoUrl: string;
}