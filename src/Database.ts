class Database
{
    private static _instance: Database;
    private constructor() {}
    public static get Instance() { return this._instance || (this._instance = new this()); }

    private flags : {url: string, location: string}[]
    private races : {location: string, name: string, raceID: string, series: string, track : string, weather: string, week: string, year: string}[]

    public parseFlags(flags) : void {
        this.flags = flags
    }

    public parseRaces(races) : void {
        this.races = races
    }

}

export default Database.Instance;