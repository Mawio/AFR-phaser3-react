import DriverHandle from "game/DriverHandle";
import { updateDistance, addDrivers, driversSelectors} from "../../store/features/driversSlice"
import { store } from "../../store/Store"
import { Scene, GameObjects} from "phaser";
import Path from "game/Path";
import Track from "game/Track";
import $ from "jquery";

const exampleDrivers = [
  {id: 0, name: 'Waka', position: 1, distance: 0, totalDistance: 0},
  {id: 1, name: 'Savoca', position: 2, distance: 0, totalDistance: 0}
]

export default class RaceScene extends Scene {
  private path: Path
  private track: Track
  private graphics : GameObjects.Graphics
  private driversHandles : DriverHandle[]
  private timeOfPause : number
  private trackBackground : GameObjects.Sprite

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
    this.path.initialize()
    this.path.update(this.track.width, this.track.height)
    this.inputHandling()
  }

  update(time, delta) {
    this.graphics.clear()
    this.drawPath()
    this.driversHandles.forEach(driverHandle => {
      driverHandle.timeline.update(delta)
      const driver = driverHandle.driver
      this.drawCar(this.path.getPoint(driver.distance))
      store.dispatch(updateDistance({id:driver.id, distance: driver.distance}))
    })
  }

  drawCar(point: Phaser.Math.Vector2) {
    this.graphics.fillStyle(0xffff00, 1);
    this.graphics.fillCircle(point.x, point.y, 16);
  }

  drawPath() {
    this.graphics.setScale(this.path.scale)
    this.graphics.lineStyle(3, 0xff00ff);
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
      }, 100)
    })
  }

  inputHandling() {
    this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {

      if (deltaY > 0) {
          var newZoom = this.cameras.main.zoom -.075;
          if (newZoom > 0.3) {
              this.cameras.main.zoom = newZoom;   
              //this.cameras.main.pan(this.cameras.main.centerX + (pointer.worldX - this.cameras.main.centerX)*0.05, this.cameras.main.centerY + (pointer.worldY - this.cameras.main.centerY)*0.05, 0, "Power2");  
          }
      }
    
      if (deltaY < 0) {
          var newZoom = this.cameras.main.zoom +.075;
          if (newZoom < 5) {
              this.cameras.main.zoom = newZoom;     
              //this.cameras.main.pan(this.cameras.main.centerX + (pointer.worldX - this.cameras.main.centerX)*0.05, this.cameras.main.centerY + (pointer.worldY - this.cameras.main.centerY)*0.05, 0, "Power2");
          }
      }

      //this.cameras.main.centerOn(pointer.worldX, pointer.worldY);
    });

    this.input.on('pointermove', (pointer) => {
        if (!pointer.isDown) return;

        this.cameras.main.followOffset.x += (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.cameras.main.followOffset.y += (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });
  }
}