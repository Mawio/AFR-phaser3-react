export interface Race {
    location: string,
    name: string,
    series: string, 
    track: string, 
    weather: Weather, 
    week: integer, 
    year: integer,
    currentLap: integer,
    totalLaps: integer
}

export interface Weather {
    information: string,
    temperature: number,
    trackTemperature: number
}

class Database {
    private static _instance: Database;
    private constructor() {
        this.lapTimes = new Map<number, number[]>().set(0, [0, 15, 16, 20]).set(1, [1, 15, 10, 15])
        this.races = new Map<number, Race>().set(0, {currentLap: 0, location: "", name: "Liechtenstein Grand Prix", series: "", track: "", weather: {information: "Moderate Rain", temperature: 37, trackTemperature: 50}, week: 13, year: 1970, totalLaps: 2})
    }
    public static get Instance() { return this._instance || (this._instance = new this()); }

    private flags: { url: string, location: string }[]
    private races: Map<number, Race>
    private lapTimes: Map<number, number[]>

    public parseFlags(flags): void {
        this.flags = flags
    }

    public parseRaces(races): void {
        //this.races = races
    }

    public parseLapTimes(lapTimes): void {

    }

    public getLaptimes(driverID: number): number[] {
        return this.lapTimes.get(driverID)
    }

    public getRace(id: number) : Race {
        return this.races.get(0)
    }
}

export default Database.Instance;