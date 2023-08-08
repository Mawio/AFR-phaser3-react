import store from "../../store";
import { Scene, Curves, GameObjects} from "phaser";

export default class ExampleScene extends Scene {

  pathGraphics! : GameObjects.Graphics
  path = new Curves.Path().fromJSON({"type":"Path","x":2700.0235,"y":2034.3079,"autoClose":false,"curves":[{"type":"CubicBezierCurve","points":[2700.0235,2034.3079,2808.3217999999997,1970.6031,4192.2927,1111.1378,4264.3665,1087.1132]},{"type":"CubicBezierCurve","points":[4264.3665,1087.1132,4336.4403,1063.0886,4468.5756,1021.0455,4528.6371,1021.0455]},{"type":"CubicBezierCurve","points":[4528.6371,1021.0455,4588.6986,1021.0455,5889.0301,1060.0855,5925.067,1069.0946999999999]},{"type":"CubicBezierCurve","points":[5925.067,1069.0946999999999,5961.1039,1078.1038999999998,6051.1962,1120.147,6072.2177,1198.2269]},{"type":"CubicBezierCurve","points":[6072.2177,1198.2269,6093.2392,1276.3068999999998,6099.2454,1537.5744,6054.1993,1663.7035999999998]},{"type":"CubicBezierCurve","points":[6054.1993,1663.7035999999998,6009.1531,1789.8327,5958.1009,1861.9064999999998,5901.0424,1876.9218999999998]},{"type":"CubicBezierCurve","points":[5901.0424,1876.9218999999998,5843.984,1891.9372999999998,5747.8856000000005,1912.9587999999999,5660.7964,1810.8541999999998]},{"type":"CubicBezierCurve","points":[5660.7964,1810.8541999999998,5573.7073,1708.7496999999998,5549.6827,1603.6420999999998,5471.6027,1549.5866999999998]},{"type":"CubicBezierCurve","points":[5471.6027,1549.5866999999998,5393.522800000001,1495.5313999999998,4858.9754,1606.6450999999997,4798.9139000000005,1633.6727999999998]},{"type":"CubicBezierCurve","points":[4798.9139000000005,1633.6727999999998,4738.852400000001,1660.7005,4660.7725,1909.9556999999998,4651.7632,2009.0571999999997]},{"type":"CubicBezierCurve","points":[4651.7632,2009.0571999999997,4642.754,2108.1587,4663.775500000001,2615.6784,4648.760200000001,2654.7182999999995]},{"type":"CubicBezierCurve","points":[4648.760200000001,2654.7182999999995,4633.7448,2693.7582999999995,4567.677100000001,2717.7828999999997,4528.637100000001,2753.8197999999998]},{"type":"CubicBezierCurve","points":[4528.637100000001,2753.8197999999998,4489.597200000001,2789.8567,4696.809400000001,3105.1796,4849.966200000001,3288.3671999999997]},{"type":"CubicBezierCurve","points":[4849.966200000001,3288.3671999999997,5003.1230000000005,3471.5546999999997,5099.2214,3636.7238999999995,5162.286000000001,3693.7823]},{"type":"CubicBezierCurve","points":[5162.286000000001,3693.7823,5225.350600000001,3750.8406999999997,5444.575000000001,3916.0098,5468.599600000001,3970.0652]},{"type":"CubicBezierCurve","points":[5468.599600000001,3970.0652,5492.624200000001,4024.1205,5495.627300000001,4114.2128,5423.553500000002,4138.2374]},{"type":"CubicBezierCurve","points":[5423.553500000002,4138.2374,5351.479700000002,4162.262,5213.338300000002,4126.2251,5141.264500000002,4072.1697]},{"type":"CubicBezierCurve","points":[5141.264500000002,4072.1697,5069.190700000002,4018.1144,4669.781700000002,3903.9975,4573.683300000002,3897.9914]},{"type":"CubicBezierCurve","points":[4573.683300000002,3897.9914,4477.584900000003,3891.9852,4267.369600000003,3852.9453,4216.317300000002,3792.8838]},{"type":"CubicBezierCurve","points":[4216.317300000002,3792.8838,4165.265100000002,3732.8223000000003,4030.1267000000025,3450.5332,3831.9237000000026,3402.484]},{"type":"CubicBezierCurve","points":[3831.9237000000026,3402.484,3633.720800000003,3354.4348,3156.2319000000025,3381.4625,3003.0750000000025,3387.4686]},{"type":"CubicBezierCurve","points":[3003.0750000000025,3387.4686,2849.9182000000023,3393.4748,2663.7276000000024,3252.3303,2516.5769000000028,3108.1827000000003]},{"type":"CubicBezierCurve","points":[2516.5769000000028,3108.1827000000003,2369.4262000000026,2964.0351,1921.9680000000028,2630.6937000000003,1891.9373000000028,2549.6107]},{"type":"CubicBezierCurve","points":[1891.9373000000028,2549.6107,1861.9065000000028,2468.5277,1858.9034000000029,2312.3678,1942.9895000000029,2213.2663000000002]},{"type":"CubicBezierCurve","points":[1942.9895000000029,2213.2663000000002,2027.0756000000029,2114.1648,2096.146400000003,2096.1464,2162.2140000000027,2087.1371000000004]},{"type":"CubicBezierCurve","points":[2162.2140000000027,2087.1371000000004,2228.2817000000027,2078.1279000000004,2462.5215000000026,2120.1710000000003,2504.5646000000024,2114.1648000000005]},{"type":"CubicBezierCurve","points":[2504.5646000000024,2114.1648000000005,2546.6076000000025,2108.1587000000004,2700.0235000000025,2034.3079000000005,2700.0235000000025,2034.3079000000005]},{"type":"LineCurve","points":[2700.0235000000025,2034.3079000000005,2700.0235,2034.3079]}]})

  create() {
    this.pathGraphics = new GameObjects.Graphics(this)
  }

  render() {
    this.path.draw(this.pathGraphics)
  }
}