import { Driver } from 'store/features/driversSlice';

export default class Timeline{
    private _lapCounter: number
    private _elapsed: number
    private _totalElapsed: number

    private get duration() {
        return this.getLapTime(this._lapCounter)
    }

    private get startingDistance() {
        return 1 - ((this.target.position - 1) * 0.05)
    }

    private get lapLength() {
        return this._lapCounter === 0 ? 1 - this.startingDistance : 1
    }

    public get hasFinished() {
        return this._lapCounter === this.lapTimes.length
    }

    getLapTime(lap: number) {
        return this.lapTimes[lap] * 1000
    }

    constructor(
        private target: Driver,
        private lapTimes: number[],
    ){
        this._lapCounter = this._totalElapsed = this._elapsed = 0
        this.target.distance = this.startingDistance
    }

    update(delta): boolean {
        if(this.hasFinished) return false

        const remainingTime = this.duration - this._elapsed

        if(delta >= remainingTime) {
            delta -= remainingTime
            this._totalElapsed += remainingTime
            this.target.distance = 1
            if(this.nextLap()) {
                return this.update(delta)
            }
        } else {
            this._totalElapsed += delta
            this._elapsed += delta
            const speed = this.lapLength/this.duration
            this.target.distance += speed*delta
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

}