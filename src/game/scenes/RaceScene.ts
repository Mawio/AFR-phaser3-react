import { updateDistance, Driver, addDrivers, driversSelectors} from "../../store/features/driversSlice"
import { store } from "../../store/Store"
import { Scene, GameObjects} from "phaser";
import Timeline from "../Timeline"
import Database from "Database";

const exampleDrivers = [
  {id: 0, name: 'Waka', position: 1, distance: 0, totalDistance: 0},
  {id: 1, name: 'Savoca', position: 2, distance: 0, totalDistance: 0}
]

class DriverHandle {
  public timeline: Timeline
  public driver: Driver
  constructor(driver: Driver){
    this.driver = structuredClone(driver)
    this.timeline = new Timeline(this.driver, Database.getLaptimes(driver.id))
  }
}

export default class RaceScene extends Scene {
  private path : Phaser.Curves.Path
  private graphics : GameObjects.Graphics
  private driversHandles : DriverHandle[]
  private timeOfPause : number
  private track : GameObjects.Sprite

  constructor() {
    super({
      key: 'RaceScene'
    })
    this.driversHandles = []
  }

  preload() {
    this.load.json('track1', {"type":"Path","x":4416.0914,"y":2407.4596,"autoClose":false,"curves":[{"type":"CubicBezierCurve","points":[4416.0914,2407.4596,4447.8639,2412.755,4605.89,2439.2321,4615.366,2441.4617000000003]},{"type":"CubicBezierCurve","points":[4615.366,2441.4617000000003,4624.842,2443.6914,4745.8002,2461.5285000000003,4755.2762,2462.0859000000005]},{"type":"CubicBezierCurve","points":[4755.2762,2462.0859000000005,4764.7522,2462.6433000000006,4826.7711,2468.1619000000005,4838.6093,2470.1684000000005]},{"type":"CubicBezierCurve","points":[4838.6093,2470.1684000000005,4855.0529,2472.9554000000003,4879.0215,2483.8250000000003,4897.9735,2494.1371000000004]},{"type":"CubicBezierCurve","points":[4897.9735,2494.1371000000004,4909.3145,2500.3079000000002,4937.271,2516.1549000000005,4946.4683,2521.4502]},{"type":"CubicBezierCurve","points":[4946.4683,2521.4502,4953.5721,2525.5402000000004,4975.172500000001,2541.7588,4992.7335,2542.9106]},{"type":"CubicBezierCurve","points":[4992.7335,2542.9106,5009.457,2544.0075,5020.6041000000005,2536.779,5026.1782,2525.6309]},{"type":"CubicBezierCurve","points":[5026.1782,2525.6309,5030.289400000001,2517.4083,5038.286300000001,2508.0098000000003,5031.4736,2494.6945]},{"type":"CubicBezierCurve","points":[5031.4736,2494.6945,5019.229600000001,2470.7639,4987.6251,2472.4342,4967.0926,2463.2007]},{"type":"CubicBezierCurve","points":[4967.0926,2463.2007,4950.2690999999995,2455.6351999999997,4936.435,2447.3145,4933.9266,2431.9856999999997]},{"type":"CubicBezierCurve","points":[4933.9266,2431.9856999999997,4931.418299999999,2416.6569,4942.2633,2405.676,4953.1572,2403.0002999999997]},{"type":"CubicBezierCurve","points":[4953.1572,2403.0002999999997,4969.0434,2399.0984,5006.668699999999,2414.7061999999996,5027.850399999999,2421.6735999999996]},{"type":"CubicBezierCurve","points":[5027.850399999999,2421.6735999999996,5031.3895999999995,2422.8378,5047.674999999999,2430.1175,5072.651999999999,2438.0588]},{"type":"CubicBezierCurve","points":[5072.651999999999,2438.0588,5088.390099999999,2443.0625999999997,5108.083199999999,2447.6569,5128.626299999999,2453.2646999999997]},{"type":"CubicBezierCurve","points":[5128.626299999999,2453.2646999999997,5161.114399999999,2462.1331999999998,5194.583599999999,2469.1204999999995,5224.994799999999,2476.4444]},{"type":"CubicBezierCurve","points":[5224.994799999999,2476.4444,5258.181399999999,2484.4366999999997,5287.247599999999,2492.4574,5295.407799999998,2494.4157999999998]},{"type":"CubicBezierCurve","points":[5295.407799999998,2494.4157999999998,5315.818399999998,2499.3142999999995,5381.806599999998,2524.5159999999996,5401.873499999998,2523.4012]},{"type":"CubicBezierCurve","points":[5401.873499999998,2523.4012,5421.9402999999975,2522.2864,5423.612399999998,2502.7769999999996,5417.480899999998,2493.8583999999996]},{"type":"CubicBezierCurve","points":[5417.480899999998,2493.8583999999996,5411.349399999997,2484.9397999999997,5377.904699999997,2464.3155999999994,5368.428699999998,2458.1840999999995]},{"type":"CubicBezierCurve","points":[5368.428699999998,2458.1840999999995,5358.952699999998,2452.0525999999995,5346.1322999999975,2455.9543999999996,5337.771099999998,2451.4950999999996]},{"type":"CubicBezierCurve","points":[5337.771099999998,2451.4950999999996,5329.409899999998,2447.0357999999997,5247.198999999998,2350.8889999999997,5216.255399999998,2325.2414999999996]},{"type":"CubicBezierCurve","points":[5216.255399999998,2325.2414999999996,5187.008199999998,2300.9999999999995,5103.491699999998,2276.4477999999995,5067.983999999999,2263.0900999999994]},{"type":"CubicBezierCurve","points":[5067.983999999999,2263.0900999999994,5041.606399999999,2253.1670999999997,5002.199299999998,2239.7309999999993,4979.355599999999,2235.2194999999992]},{"type":"CubicBezierCurve","points":[4979.355599999999,2235.2194999999992,4944.989999999999,2228.4323999999992,4653.619699999999,2198.7267999999995,4620.382699999999,2191.1839999999993]},{"type":"CubicBezierCurve","points":[4620.382699999999,2191.1839999999993,4563.160099999999,2178.1979999999994,4397.589899999999,2125.7943999999993,4341.677,2115.933499999999]},{"type":"CubicBezierCurve","points":[4341.677,2115.933499999999,4267.7148,2102.889399999999,4084.4349999999995,2105.5059999999994,4053.4952999999996,2105.3426999999992]},{"type":"CubicBezierCurve","points":[4053.4952999999996,2105.3426999999992,4033.9781999999996,2105.239699999999,3801.5453999999995,2119.835399999999,3778.6915999999997,2120.392799999999]},{"type":"CubicBezierCurve","points":[3778.6915999999997,2120.392799999999,3755.8376999999996,2120.9501999999993,3609.4134999999997,2129.9413999999992,3587.3023999999996,2128.523099999999]},{"type":"CubicBezierCurve","points":[3587.3023999999996,2128.523099999999,3563.5256999999997,2126.997999999999,3526.0760999999998,2127.240499999999,3505.5599999999995,2117.605699999999]},{"type":"CubicBezierCurve","points":[3505.5599999999995,2117.605699999999,3481.5889999999995,2106.348399999999,3423.8195999999994,2035.471199999999,3402.4388999999996,2026.7476999999992]},{"type":"CubicBezierCurve","points":[3402.4388999999996,2026.7476999999992,3372.7324,2014.6271999999992,3289.8417999999997,2014.4845999999993,3245.2488999999996,2015.0419999999992]},{"type":"CubicBezierCurve","points":[3245.2488999999996,2015.0419999999992,3200.6559999999995,2015.5993999999992,2988.2822999999994,2013.3697999999993,2961.5264999999995,2014.4845999999993]},{"type":"CubicBezierCurve","points":[2961.5264999999995,2014.4845999999993,2939.1868999999997,2015.4153999999994,2862.9735999999994,2023.8860999999993,2845.0274999999997,2037.8958999999993]},{"type":"CubicBezierCurve","points":[2845.0274999999997,2037.8958999999993,2822.6782999999996,2055.3429999999994,2821.8561999999997,2071.1248999999993,2817.7144,2086.3906999999995]},{"type":"CubicBezierCurve","points":[2817.7144,2086.3906999999995,2813.6964,2101.2003999999993,2812.7182,2116.7307999999994,2824.9606999999996,2127.3604999999993]},{"type":"CubicBezierCurve","points":[2824.9606999999996,2127.3604999999993,2844.7360999999996,2144.5306999999993,2873.6582,2139.0715999999993,2891.5714,2138.7872999999995]},{"type":"CubicBezierCurve","points":[2891.5714,2138.7872999999995,2909.1297999999997,2138.5086999999994,2926.5047999999997,2140.0957999999996,2948.9847999999997,2136.8363999999997]},{"type":"CubicBezierCurve","points":[2948.9847999999997,2136.8363999999997,2971.0038999999997,2133.6438,3010.3840999999998,2104.0343,3030.6454999999996,2111.7528999999995]},{"type":"CubicBezierCurve","points":[3030.6454999999996,2111.7528999999995,3059.9095999999995,2122.9010999999996,3052.9527,2175.0427999999997,3051.8270999999995,2201.7747999999997]},{"type":"CubicBezierCurve","points":[3051.8270999999995,2201.7747999999997,3050.7122999999997,2228.2518999999998,3048.2039999999997,2239.1213999999995,3051.8270999999995,2263.0901]},{"type":"CubicBezierCurve","points":[3051.8270999999995,2263.0901,3054.8042999999993,2282.7855999999997,3068.6022999999996,2368.2961,3078.5828999999994,2392.4094999999998]},{"type":"CubicBezierCurve","points":[3078.5828999999994,2392.4094999999998,3089.4314999999992,2418.6198999999997,3109.8395999999993,2453.1079,3129.3072999999995,2477.9721999999997]},{"type":"CubicBezierCurve","points":[3129.3072999999995,2477.9721999999997,3156.0265999999997,2512.0982999999997,3218.8412999999996,2532.2434,3229.6412999999993,2550.1569999999997]},{"type":"CubicBezierCurve","points":[3229.6412999999993,2550.1569999999997,3240.5862999999995,2568.3109999999997,3193.3761999999992,2570.9246999999996,3183.3761999999992,2585.8311999999996]},{"type":"CubicBezierCurve","points":[3183.3761999999992,2585.8311999999996,3168.9760999999994,2607.2969,3165.2069999999994,2696.9831999999997,3162.751999999999,2729.6433999999995]},{"type":"CubicBezierCurve","points":[3162.751999999999,2729.6433999999995,3160.054099999999,2765.5352999999996,3155.993699999999,2786.6411999999996,3165.539099999999,2806.0086999999994]},{"type":"CubicBezierCurve","points":[3165.539099999999,2806.0086999999994,3171.4912999999992,2818.0855999999994,3234.771299999999,2912.4440999999993,3250.544299999999,2930.5901999999996]},{"type":"CubicBezierCurve","points":[3250.544299999999,2930.5901999999996,3273.560499999999,2957.0691999999995,3374.569399999999,3006.6294,3399.373199999999,3006.3980999999994]},{"type":"CubicBezierCurve","points":[3399.373199999999,3006.3980999999994,3413.863499999999,3006.2629999999995,3420.276299999999,2990.1962999999996,3435.602799999999,2966.6439999999993]},{"type":"CubicBezierCurve","points":[3435.602799999999,2966.6439999999993,3451.889399999999,2941.6160999999993,3477.646399999999,2902.957299999999,3489.9524999999994,2885.9972999999995]},{"type":"CubicBezierCurve","points":[3489.9524999999994,2885.9972999999995,3497.6798999999996,2875.3474999999994,3518.7742999999996,2849.7666999999997,3536.8426999999992,2815.4607999999994]},{"type":"CubicBezierCurve","points":[3536.8426999999992,2815.4607999999994,3554.0922999999993,2782.7092999999995,3569.091999999999,2741.8573999999994,3567.990099999999,2704.5598999999993]},{"type":"CubicBezierCurve","points":[3567.990099999999,2704.5598999999993,3565.7347999999993,2628.219699999999,3559.445799999999,2543.0038999999992,3581.925299999999,2505.285299999999]},{"type":"CubicBezierCurve","points":[3581.925299999999,2505.285299999999,3599.598599999999,2475.631099999999,3640.453499999999,2460.413699999999,3662.749999999999,2465.4303999999993]},{"type":"CubicBezierCurve","points":[3662.749999999999,2465.4303999999993,3685.0463999999993,2470.4470999999994,3754.725299999999,2490.0039999999995,3792.069399999999,2490.5138999999995]},{"type":"CubicBezierCurve","points":[3792.069399999999,2490.5138999999995,3828.021699999999,2491.0046999999995,3943.963999999999,2475.1850999999997,4010.5746999999988,2456.5117999999993]},{"type":"CubicBezierCurve","points":[4010.5746999999988,2456.5117999999993,4076.276399999999,2438.0933999999993,4223.505799999999,2397.4261999999994,4258.065299999998,2394.639199999999]},{"type":"CubicBezierCurve","points":[4258.065299999998,2394.639199999999,4292.624799999999,2391.852099999999,4416.091399999998,2407.459599999999,4416.091399999998,2407.459599999999]},{"type":"LineCurve","points":[4416.091399999998,2407.459599999999,4416.0914,2407.4596]}]})
    this.inactiveTabHandling()
    store.dispatch(addDrivers(exampleDrivers))
    this.load.image('track', "https://i.imgur.com/1Uyxnrn.jpg");
  }

  create() {
    window.addEventListener('resize', (event) => {
      this.scale.resize(window.innerWidth, window.innerHeight);
    })
    
    this.path = new Phaser.Curves.Path().fromJSON(this.cache.json.get('track1'))
    
    this.graphics = this.add.graphics()

    const drivers = driversSelectors.selectAll(store.getState())

    drivers.forEach(driver => {
      this.driversHandles.push(new DriverHandle(driver))
    })

    this.initializeTrack()
    
    this.inputHandling()

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const scale = Math.min(this.cameras.main.width / 8192, this.cameras.main.height / 4883)
    this.graphics.setPosition(screenCenterX - this.track.width * Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160) / 2, screenCenterY - this.track.height * Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160) / 2)
    this.graphics.setScale(scale)
  }

  update(time, delta) {
    this.graphics.clear()
    this.drawPath()

    //this.drawTrack()

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

  initializeTrack() {
    const scale = Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160)
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.track = this.add.sprite(screenCenterX, screenCenterY, 'track');
    this.track.setDepth(-1)
    this.track.setScale(scale)
  }

  drawTrack() {
    const scale = Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160)
    this.track.setScale(scale)
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.track.setPosition(screenCenterX,screenCenterY)
  }

  drawPath() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const bounds = this.path.getBounds() as unknown as Phaser.Geom.Rectangle
    const scale = Math.min(this.cameras.main.width / 8192, this.cameras.main.height / 4883)

    this.graphics.lineStyle(3, 0xff00ff);
    //this.graphics.setPosition(screenCenterX - this.track.width * Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160) / 2, screenCenterY - this.track.height * Math.min(this.cameras.main.width / 3624, this.cameras.main.height / 2160) / 2)
    //this.graphics.setScale(scale)
    this.path.draw(this.graphics)
  }

  inactiveTabHandling() {
    this.game.events.on('hidden',function(){
      this.timeOfPause = Date.now()
    },this);
  
    this.game.events.on('visible',function(){
        const timeLost = Date.now() - this.timeOfPause
        this.driversHandles.forEach(driverHandle => {
          driverHandle.timeline.update(timeLost)
        });
    },this);
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
          if (newZoom < 1.3) {
              this.cameras.main.zoom = newZoom;     
              //this.cameras.main.pan(this.cameras.main.centerX + (pointer.worldX - this.cameras.main.centerX)*0.05, this.cameras.main.centerY + (pointer.worldY - this.cameras.main.centerY)*0.05, 0, "Power2");
          }
      }

      //this.cameras.main.centerOn(pointer.worldX, pointer.worldY);
    
    });

    this.input.on('pointermove', (pointer) => {
        if (!pointer.isDown) return;

        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });
  }
}