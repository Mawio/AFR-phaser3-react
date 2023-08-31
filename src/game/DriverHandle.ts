import Timeline from "./Timeline"
import Database from "Database"

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
  }

  public get startingPosition() {return this._startingPosition}
  public get distance() {return this._distance}
  public get totalDistance() {return this._totalDistance}
  public get id() {return this._id}
  public get gap() {return this._gap}
  public get leader() {return this._leader}

  public set distance(distance: number) {this._distance = distance}
  public set totalDistance(totalDistance: number) {this._totalDistance = totalDistance}

  public updateGaps(driverInFront: DriverHandle, leader: DriverHandle) {
    const myCumulative = this.timeline.getCumulativeTime(this.timeline.currentLap, this.timeline.progress)
    this.updateGap(driverInFront, myCumulative)
    this.updateLeader(leader, myCumulative)
  }

  public updateTimeline(delta: number) : boolean {
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