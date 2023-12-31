import { GameObjects } from "phaser"
import path from "./path_json"
import RaceScene from "./RaceScene"

export default class Path{
    private path! : Phaser.Curves.Path
    private _scale: number = 1
    private center!: {x: number, y: number}
    private position!: {x: number, y: number}
    private scene: RaceScene
    
    constructor(scene: RaceScene) {
        this.scene = scene
        scene.load.json('track1', path)
    }

    public get length() {
        return this.path.getLength()
    }

    public initialize(width: number, height: number) : void {
        this.path = new Phaser.Curves.Path().fromJSON(this.scene.cache.json.get('track1'))
        this.center = {x: this.scene.screenCenterX, y: this.scene.screenCenterY}
        this.update(width, height)
    }

    public getPoint(distance: number) {
        return this.path.getPoint(distance)
    }

    public draw(graphics: GameObjects.Graphics) {
        graphics.setScale(this._scale)
        graphics.setPosition(this.position.x, this.position.y)
        return this.path.draw(graphics)
    }

    public update(width: number, height: number) {
        this.position = { x: this.center.x - width / 2, y: this.center.y - height / 2}
        this._scale = Math.min(this.scene.cameras.main.width / 8192, this.scene.cameras.main.height / 4883) * 2
    }

}