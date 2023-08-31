import DriverHandle from './DriverHandle';

export default class Timeline{
    private _lapCounter: number
    private _elapsed: number
    private _totalElapsed: number

    public get currentLap() { return this._lapCounter }

    private get duration() { return this.getLapTime(this._lapCounter) }

    private get startingDistance() { return 1 - ((this.target.startingPosition - 1) * 0.05) }

    private get lapLength() { return this._lapCounter === 0 ? 1 - this.startingDistance : 1 }

    public get hasFinished() { return this._lapCounter === this.lapTimes.length }

    public get progress() { return this._elapsed / this.duration }

    getLapTime(lap: number) { return this.lapTimes[lap] * 1000 }

    constructor(
        private target: DriverHandle,
        private lapTimes: number[],
    ){
        this._lapCounter = this._totalElapsed = this._elapsed = 0
        this.target.distance = this.startingDistance
        this.target.totalDistance = this.startingDistance - 1
    }

    update(delta): boolean {
        if(this.hasFinished) return false

        const remainingTime = this.duration - this._elapsed

        if(delta >= remainingTime) {
            delta -= remainingTime
            this._totalElapsed += remainingTime
            this.target.totalDistance += (1 - this.target.distance)
            this.target.distance = 1
            if(this.nextLap()) {
                return this.update(delta)
            }
        } else {
            this._totalElapsed += delta
            this._elapsed += delta
            const speed = this.lapLength/this.duration
            const movement = speed*delta
            this.target.distance += movement
            this.target.totalDistance += movement
            return true
        }
    }

    nextLap(): boolean {
        if(++this._lapCounter < this.lapTimes.length) {
            this._elapsed = 0
            this.target.distance = 0
            return true
        } else {
            return false
        }
    }

    public getCumulativeTime(lap: number, progress: number) : number {
        let cumulativeTime = 0;

        this.lapTimes.some((lapTime, index) => {
            if(index > lap) return true
            if(index === lap) {
                cumulativeTime += progress*lapTime
                return true
            }
            cumulativeTime += lapTime
            return false
        })

        return cumulativeTime;
  }

}