class Database
{
    private static _instance: Database;
    private constructor() {
        this.lapTimes = new Map<number, number[]>().set(0, [0, 15, 16, 20]).set(1, [1, 14, 21, 15])
    }
    public static get Instance() { return this._instance || (this._instance = new this()); }

    private flags : {url: string, location: string}[]
    private races : {location: string, name: string, raceID: string, series: string, track : string, weather: string, week: string, year: string}[]
    private lapTimes : Map<number, number[]>

    public parseFlags(flags) : void {
        this.flags = flags
    }

    public parseRaces(races) : void {
        this.races = races
    }

    public parseLapTimes(lapTimes) : void {

    }

    public getLaptimes(driverID: number): number[] {
        return this.lapTimes.get(driverID)
    }
}

export default Database.Instance;