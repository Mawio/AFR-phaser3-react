import DriverHandle from "game/DriverHandle";
import { updateTotalDistance, addDrivers, driversSelectors, updatePosition} from "../../store/features/driversSlice"
import { store } from "../../store/Store"
import { Scene, GameObjects} from "phaser";
import Path from "game/Path";
import Track from "game/Track";
import $ from "jquery";
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';

const exampleDrivers = [
  {id: 0, name: 'Waka', position: 1, previousPosition: 1, distance: 0, totalDistance: 0},
  {id: 1, name: 'Savoca', position: 2, previousPosition: 2, distance: 0, totalDistance: 0}
]

export default class RaceScene extends Scene {
  private path: Path
  private track: Track
  private graphics : GameObjects.Graphics
  private driversHandles : DriverHandle[]
  private timeOfPause : number
  private rexGestures : GesturesPlugin

  constructor() {
    super({
      key: 'RaceScene'
    })
    this.driversHandles = []
  }

  public get screenCenterX() : number {
    return this.cameras.main.worldView.x + this.cameras.main.width / 2;
  }

  public get screenCenterY() : number {
    return this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  preload() {
    this.path = new Path(this)
    this.track = new Track(this)
    this.startListeners()
    store.dispatch(addDrivers(exampleDrivers))
  }

  create() {
    this.graphics = this.add.graphics()
    const drivers = driversSelectors.selectAll(store.getState())
    drivers.forEach(driver => {
      this.driversHandles.push(new DriverHandle(driver))
    })

    this.track.initialize()
    this.path.initialize(this.track.width, this.track.height)
    this.inputHandling()
    this.zoomCameraClamped(0)
    this.moveCameraClamped(new Phaser.Math.Vector2(0,0))
  }

  update(time, delta) {
    this.graphics.clear()
    this.drawPath()

    this.driversHandles.forEach((driverHandle, index, driverHandles) => {
      driverHandle.timeline.update(delta)
      const driver = driverHandle.driver
      this.drawCar(this.path.getPoint(driver.distance))
      if(index > 0) {
        const previousDriver = driverHandles[index-1].driver
        if(driver.totalDistance > previousDriver.totalDistance) {
          store.dispatch(updatePosition({id:driver.id, position: previousDriver.position}))
          store.dispatch(updatePosition({id:previousDriver.id, position: driver.position}))     
        }
      }
      store.dispatch(updateTotalDistance({id:driver.id, totalDistance: driver.totalDistance}))
    })
  }

  drawCar(point: Phaser.Math.Vector2) {
    this.graphics.fillStyle(0xffff00, 1);
    this.graphics.fillCircle(point.x, point.y, 16);
  }

  drawPath() {
    this.graphics.lineStyle(0, 0xff00ff);
    this.path.draw(this.graphics)
  }

  startListeners() {
    this.game.events.on('hidden',function(){
      this.timeOfPause = Date.now()
    },this);
  
    this.game.events.on('visible',function(){
        const timeLost = Date.now() - this.timeOfPause
        this.driversHandles.forEach(driverHandle => {
          driverHandle.timeline.update(timeLost)
        });
    },this);

    $(window).on('resize', () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
      setTimeout(() => {
        this.track.update()
        this.path.update(this.track.width, this.track.height)
        this.zoomCameraClamped(0)
        this.moveCameraClamped(new Phaser.Math.Vector2(0,0))
      }, 100)
    })
  }

  inputHandling() {
    this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      this.zoomCameraClamped(-Math.sign(deltaY) * .075)
      this.moveCameraClamped(new Phaser.Math.Vector2(0,0))
    }); 

    this.input.on('pointermove', (pointer) => {
        if (!pointer.isDown) return;
        this.moveCameraClamped(new Phaser.Math.Vector2((pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom, (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom))
    });

    var pinch = this.rexGestures.add.pinch(this);
    pinch.on('pinch', function (dragScale) {
      console.log("Pinch")
      var scaleFactor = dragScale.scaleFactor;
      this.zoomCameraClamped(this.cameras.main.zoom * scaleFactor - this.cameras.main.zoom);
    }, this)
  }

  zoomCameraClamped(amount: number) {
    var newZoom = this.cameras.main.zoom + amount
    const min = Math.max(this.cameras.main.height / this.track.height, this.cameras.main.width / this.track.width)
    this.cameras.main.zoom = Phaser.Math.Clamp(newZoom, min, 5)
  }

  moveCameraClamped(movement: Phaser.Math.Vector2) {
    const currentPosition = this.track.position.subtract(this.cameras.main.followOffset)
    const nextPosition = this.clamp(currentPosition.subtract(movement))
    const offset = this.track.position.subtract(nextPosition)
    this.cameras.main.followOffset = offset
  }

  clamp(position: Phaser.Math.Vector2) : Phaser.Math.Vector2 {
    return new  Phaser.Math.Vector2({x: this.clampX(position.x), y: this.clampY(position.y)})
  }

  clampX(x: number) : number {
    const min = this.track.position.x - this.track.width / 2 + this.cameras.main.displayWidth / 2
    const max = this.track.position.x + this.track.width / 2 - this.cameras.main.displayWidth / 2
    return Phaser.Math.Clamp(x, min, max)
  }

  clampY(y: number) : number {
    const min = this.track.position.y - this.track.height / 2 + this.cameras.main.displayHeight / 2
    const max = this.track.position.y + this.track.height / 2 - this.cameras.main.displayHeight / 2
    return Phaser.Math.Clamp(y, min, max)
  }

}