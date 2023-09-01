import Timeline from "./Timeline"
import Database from "Database"
import { store } from "../store/Store"
import { getOvertaken, overtake, updateGap, updateLeader, updateTotalDistance } from "store/features/driversSlice"

export default class DriverHandle {
  private timeline: Timeline
  private _gap: number
  private _leader: number
  constructor(
    private _id: number,
    private _startingPosition: number,
    private _distance: number,
    private _totalDistance: number
  ) {
    this.timeline = new Timeline(this, Database.getLaptimes(this._id))
    var t = this
    setInterval(function(){t.storeGaps()}, 1000)
  }

  public get startingPosition() {return this._startingPosition}
  public get distance() {return this._distance}
  public get totalDistance() {return this._totalDistance}
  public get id() {return this._id}
  public get gap() {return this._gap}
  public get leader() {return this._leader}
  public get totalElapsed() { return this.timeline.totalElapsed }

  public set distance(distance: number) {this._distance = distance}
  public set totalDistance(totalDistance: number) {this._totalDistance = totalDistance}

  public update(delta: number , index: number, drivers: DriverHandle[]) {
    this.updateTimeline(delta)
    if(index > 0) {
      const driverInFront = drivers[index-1]
      this.updateGaps(driverInFront, drivers[0])
      if (this.totalDistance > driverInFront.totalDistance || (this.totalDistance === driverInFront.totalDistance && this.totalElapsed < driverInFront.totalElapsed)) {
        drivers[index] = driverInFront
        drivers[index-1] = this
        store.dispatch(overtake({ id: this.id }))
        store.dispatch(getOvertaken({ id: driverInFront.id }))
      }
    }
    store.dispatch(updateTotalDistance({ id: this.id, totalDistance: this.totalDistance }))
  }

  public storeGaps() {
    store.dispatch(updateGap({id: this.id, gap: this.gap}))
    store.dispatch(updateLeader({id: this.id, leader: this.leader}))
  }

  private updateGaps(driverInFront: DriverHandle, leader: DriverHandle) {
    const myCumulative = this.timeline.getCumulativeTime(this.timeline.currentLap, this.timeline.progress)
    this.updateGap(driverInFront, myCumulative)
    this.updateLeader(leader, myCumulative)
  }

  private updateTimeline(delta: number) : boolean {
    return this.timeline.update(delta)
  }

  private updateGap(driverInFront: DriverHandle, myCumulative: number) {
    this._gap = this.calculateGapFromDriver(driverInFront, myCumulative)
  }

  private updateLeader(leader: DriverHandle, myCumulative: number) {
    this._leader = this.calculateGapFromDriver(leader, myCumulative)
  }

  private calculateGapFromDriver(driver: DriverHandle, myCumulative: number) : number {
    const otherDriverCumulative = driver.timeline.getCumulativeTime(this.timeline.currentLap, this.timeline.progress)
    return (myCumulative - otherDriverCumulative)
  }
}