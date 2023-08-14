import { updateDistance, Driver, addDrivers, driversSelectors} from "../../store/features/driversSlice"
import { store } from "../../store"
import { Scene, GameObjects} from "phaser";
import Timeline from "../Timeline"

const exampleDrivers = [
  {id: 0, name: 'Waka', position: 1, distance: 0, totalDistance: 0},
  {id: 1, name: 'Savoca', position: 2, distance: 0, totalDistance: 0}
]

class DriverHandle {
  constructor(    
    public driver: Driver,
    public timeline: Timeline
  ) 
  {}

}

export default class RaceScene extends Scene {
  private path : Phaser.Curves.Path
  private graphics : GameObjects.Graphics
  private driversHandles : DriverHandle[]
  private timeOfPause : number

  constructor() {
    super({
      key: 'RaceScene'
    })
  }

  preload() {
    this.load.json('track1', {"type":"Path","x":259.00713,"y":314.78758,"autoClose":false,"curves":[{"type":"CubicBezierCurve","points":[259.00713,314.78758,290.76424,296.10694,696.59636,44.079522,717.73109,37.034608]},{"type":"CubicBezierCurve","points":[717.73109,37.034608,738.86584,29.989701999999998,777.61286,17.661087,795.22514,17.661087]},{"type":"CubicBezierCurve","points":[795.22514,17.661087,812.8374200000001,17.661087,1194.1433,29.109074,1204.7107,31.750915]},{"type":"CubicBezierCurve","points":[1204.7107,31.750915,1215.278,34.392748,1241.6965,46.721354,1247.8608000000002,69.61731]},{"type":"CubicBezierCurve","points":[1247.8608000000002,69.61731,1254.0251,92.51329100000001,1255.7863000000002,169.12671,1242.5772000000002,206.11252]},{"type":"CubicBezierCurve","points":[1242.5772000000002,206.11252,1229.3679000000002,243.09829,1214.3975000000003,264.23303,1197.6658000000002,268.63611]},{"type":"CubicBezierCurve","points":[1197.6658000000002,268.63611,1180.9341000000002,273.03918,1152.7545000000002,279.20347999999996,1127.2167000000002,249.26259]},{"type":"CubicBezierCurve","points":[1127.2167000000002,249.26259,1101.6789,219.32172,1094.6340000000002,188.50023,1071.7380000000003,172.64916]},{"type":"CubicBezierCurve","points":[1071.7380000000003,172.64916,1048.8420000000003,156.79813,892.0926700000002,189.38082,874.4804500000002,197.30635999999998]},{"type":"CubicBezierCurve","points":[874.4804500000002,197.30635999999998,856.8681500000002,205.23189,833.9721700000002,278.32286,831.3303200000003,307.38311999999996]},{"type":"CubicBezierCurve","points":[831.3303200000003,307.38311999999996,828.6884900000002,336.44339999999994,834.8527800000003,485.26718999999997,830.4497300000003,496.71515]},{"type":"CubicBezierCurve","points":[830.4497300000003,496.71515,826.0466600000003,508.16314,806.6731300000002,515.20805,795.2251400000002,525.7754199999999]},{"type":"CubicBezierCurve","points":[795.2251400000002,525.7754199999999,783.7771800000003,536.3427899999999,844.5395900000002,628.80728,889.4508400000002,682.52474]},{"type":"CubicBezierCurve","points":[889.4508400000002,682.52474,934.3621700000002,736.2421899999999,962.5418100000002,784.67598,981.0347300000002,801.40765]},{"type":"CubicBezierCurve","points":[981.0347300000002,801.40765,999.5276500000002,818.13934,1063.8124000000003,866.57303,1070.8573000000001,882.42412]},{"type":"CubicBezierCurve","points":[1070.8573000000001,882.42412,1077.9023000000002,898.2752,1078.7829000000002,924.69362,1057.6482,931.73851]},{"type":"CubicBezierCurve","points":[1057.6482,931.73851,1036.5134,938.7834,996.00521,928.2160700000001,974.8704600000001,912.3649800000001]},{"type":"CubicBezierCurve","points":[974.8704600000001,912.3649800000001,953.7357,896.51398,836.61401,863.05059,808.43438,861.28937]},{"type":"CubicBezierCurve","points":[808.43438,861.28937,780.25472,859.52815,718.61172,848.0802,703.64127,830.4679]},{"type":"CubicBezierCurve","points":[703.64127,830.4679,688.67085,812.85559,649.04321,730.07789,590.92267,715.98807]},{"type":"CubicBezierCurve","points":[590.92267,715.98807,532.80216,701.89824,392.78452,709.82378,347.87318,711.58499]},{"type":"CubicBezierCurve","points":[347.87318,711.58499,302.96187,713.34623,248.36381,671.95738,205.21372,629.6879]},{"type":"CubicBezierCurve","points":[205.21372,629.6879,162.06362,587.41842,30.852111,489.67024,22.045985,465.89366]},{"type":"CubicBezierCurve","points":[22.045985,465.89366,13.239828000000001,442.11709,12.359206000000002,396.32516,37.016405000000006,367.26488]},{"type":"CubicBezierCurve","points":[37.016405000000006,367.26488,61.67360000000001,338.20461,81.927741,332.92094,101.30123,330.27908]},{"type":"CubicBezierCurve","points":[101.30123,330.27908,120.67476,327.63725,189.36265,339.96585000000005,201.69126,338.20461]},{"type":"CubicBezierCurve","points":[201.69126,338.20461,214.01984,336.4434,259.00713,314.78758,259.00713,314.78758]},{"type":"LineCurve","points":[259.00713,314.78758,259.00713,314.78758]}]})
  }

  create() {
    
    this.game.events.on('hidden',function(){
      this.timeOfPause = Date.now()
    },this);
  
    this.game.events.on('visible',function(){
        const timeLost = Date.now() - this.timeOfPause
        this.timeline.update(timeLost)
    },this);

    store.dispatch(addDrivers(exampleDrivers))
    this.path = new Phaser.Curves.Path().fromJSON(this.cache.json.get('track1'))
    this.graphics = this.add.graphics()


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
    this.graphics.lineStyle(3, 0xff00ff);
    this.graphics.setScale(0.8)
    this.graphics.setPosition(400,20)
    this.path.draw(this.graphics)
  }
}