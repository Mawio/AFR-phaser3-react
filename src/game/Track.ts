import { GameObjects } from "phaser";
import RaceScene from "./RaceScene";

export default class Track{
    private sprite: GameObjects.Sprite
    private _scale: number
    private scene: RaceScene

    constructor(scene: RaceScene) {
        this.scene = scene
        scene.load.image('track', "https://i.imgur.com/1Uyxnrn.jpg")
    }

    public initialize(): void {
        this.sprite = this.scene.add.sprite(this.scene.screenCenterX, this.scene.screenCenterY, 'track');
        this.sprite.setDepth(-1)
        this.update()
        this.scene.cameras.main.startFollow(this.sprite)
    }

    public update(): void{
        this._scale = Math.min(this.scene.cameras.main.width / 3624, this.scene.cameras.main.height / 2160) * 2
        this.sprite.setScale(this._scale)
    }

    public get width(): number {
        return this.sprite.width*this._scale
    }

    public get height(): number {
        return this.sprite.height*this._scale
    }

    public get position(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y)
    }
}