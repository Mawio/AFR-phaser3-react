import { Driver } from "store/features/driversSlice"
import Timeline from "./Timeline"
import Database from "Database"

export default class DriverHandle {
    public timeline: Timeline
    public driver: Driver
    constructor(driver: Driver){
      this.driver = structuredClone(driver)
      this.timeline = new Timeline(this.driver, Database.getLaptimes(driver.id))
    }
  }