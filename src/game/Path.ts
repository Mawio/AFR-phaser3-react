import { GameObjects } from "phaser"
import path from "./path_json"
import RaceScene from "./scenes/RaceScene"

export default class Path{
    private path : Phaser.Curves.Path
    private _scale: number
    private x: number
    private y: number
    private scene: RaceScene
    
    constructor(scene: RaceScene) {
        this.scene = scene
        scene.load.json('track1', path)
    }

    public initialize() : void {
        this.path = new Phaser.Curves.Path().fromJSON(this.scene.cache.json.get('track1'))
    }

    public get position(): {x:number, y:number} {
        return {x: this.x, y: this.y}
    }

    public get scale(): number{
        return this._scale
    }

    public getPoint(distance: number) {
        return this.path.getPoint(distance)
    }

    public draw(graphics: GameObjects.Graphics) {
        return this.path.draw(graphics)
    }

    public update(width: number, height: number) {

        this.x = this.scene.screenCenterX - width / 2
        this.y = this.scene.screenCenterY - height / 2
        this._scale = Math.min(this.scene.cameras.main.width / 8192, this.scene.cameras.main.height / 4883) * 2
    }

}