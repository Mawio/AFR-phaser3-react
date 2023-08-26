import Timeline from "./Timeline"
import Database from "Database"

export default class DriverHandle {
  private timeline: Timeline
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

  public set distance(distance: number) {this._distance = distance}
  public set totalDistance(totalDistance: number) {this._totalDistance = totalDistance}

  public updateTimeline(delta: number) : boolean {
    return this.timeline.update(delta)
  }
}