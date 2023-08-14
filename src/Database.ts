class Database
{
    private static _instance: Database;
    private constructor() {}
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

    public getLaptimeMs(driverID: number, lap: number) : number {
        return this.getLaptimeMs(driverID, lap) * 1000
    }

    public getLaptimeS(driverID: number, lap: number) : number {
        return this.lapTimes.get(driverID)[lap+1]
    }

}

export default Database.Instance;