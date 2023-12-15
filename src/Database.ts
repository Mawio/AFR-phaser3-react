import { PreparsedLaptime } from "components/Race";
import { PreparsedRace, PreparsedResult } from "routes/DataRoot";

export interface Race {
    location: string,
    name: string,
    series: string, 
    track: string, 
    weather: Weather, 
    week: integer, 
    year: integer,
    currentLap?: integer,
    totalLaps?: integer
}

export interface Weather {
    information: string,
    temperature?: number,
    trackTemperature?: number
}

export interface Driver {
    id: number, 
    name: string, 
    position: number, 
    previousPosition?: number, 
    distance?: number, 
    totalDistance?: number, 
    gap?: number, 
    leader?: number, 
    fastestLap?: number,
    team: string,
    engine: string,
    tire: string,
    color1: string,
    color2: string
}

const exampleDrivers: Driver[] = [
    { id: 0, name: 'Waka', position: 1, previousPosition: 1, distance: 0, totalDistance: 0, gap: 0, leader: 0, fastestLap: 0, team: "Team", engine: "Engine", color1: "#000000", color2: "#FFFFFF", tire: "Tire"},
    { id: 1, name: 'Savoca', position: 2, previousPosition: 2, distance: 0, totalDistance: 0, gap: 0, leader: 0, fastestLap: 0, team: "Team", engine: "Engine", color1: "#000000", color2: "#FFFFFF", tire: "Tire" }
  ]

class Database {
    private static _instance: Database;
    private constructor() {
        this.lapTimes = new Map<number, number[]>().set(0, [0, 15, 16, 20]).set(1, [1, 15, 10, 15])
        this.races = new Map<number, Race>().set(0, {currentLap: 0, location: "", name: "Liechtenstein Grand Prix", series: "", track: "", weather: {information: "Moderate Rain", temperature: 37, trackTemperature: 50}, week: 13, year: 1970, totalLaps: 2})
        this.drivers = new Map<number, Driver[]>().set(0, exampleDrivers)
        this.flags = []
    }
    public static get Instance() { return this._instance || (this._instance = new this()); }

    private flags: { url: string, location: string }[]
    private races: Map<number, Race>
    private drivers: Map<number, Driver[]>
    private lapTimes: Map<number, number[]>

    public parseFlags(flags: { url: string, location: string }[]): void {
        this.flags = flags
    }

    public parseRaces(races: PreparsedRace[]): void {
        races.forEach((race : PreparsedRace) => {
            this.races.set(race.raceID, {location: race.location, name: race.name, series: race.series, track: race.track, weather: {information: race.weather}, week: Number(race.week), year: Number(race.year)})
        });
    }

    public parseResults(results: PreparsedResult[]): void {
        var raceID : number = -1
        var drivers : Driver[] = []
        results.forEach(element => {
            if(raceID !== +element.raceID) {
                if(drivers.length !== 0) {
                    
                    this.drivers.set(raceID, drivers)
                    drivers = []
                }
                raceID = Number(element.raceID)
            }
            drivers.push({id: Number(element.number), name: element.driver, position: Number(element.q), team: element.team, tire: element.tire, engine: element.engine, color1: element.color1, color2: element.color2})
        });
    }

    public parseLapTimes(lapTimes : PreparsedLaptime[]): void {

        const temporaryArrays : Record<number, number[]> = {}

        const driverIDs = Object.keys(lapTimes[0]).map(s => Number(s))

        driverIDs.forEach(driverID => {
            temporaryArrays[driverID] = []
        });

        let counter = 0

        lapTimes.forEach(element => {
            driverIDs.forEach(driverID => {
                temporaryArrays[driverID][counter] = element[driverID] - (temporaryArrays[driverID][counter-1] ?? 0)
            });
            counter++
        });

        driverIDs.forEach(driverID => {
            this.lapTimes.set(driverID, temporaryArrays[driverID])
        });
    }

    public getLaptimes(driverID: number): number[] {
        if(!this.lapTimes.get(driverID)) {
            throw new Error("unable to find laptimes for driver number: " + driverID)
        }
        return this.lapTimes.get(driverID)!
    }

    public getRace(raceID: number) : Race {
        if(!this.races.get(raceID)) {
            throw new Error("unable to find race with number: " + raceID)
        }
        return this.races.get(raceID)!
    }
    
    public getDrivers(raceID: number) : Driver[] {
        if(!this.drivers.get(raceID)) {
            throw new Error("unable to find drivers for race number: " + raceID)
        }
        return this.drivers.get(raceID)!
    }
}

export default Database.Instance;