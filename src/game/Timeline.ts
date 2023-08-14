import * as createjs from 'createjs-module';

export default class Timeline{
    private tweens: createjs.Tween[]

    constructor() {

    }

    update(delta) { 
        var remainingTime = this.tweenChain.currentTween.duration - this.tweenChain.currentTween.elapsed
        console.log(remainingTime)
        createjs.Tween.get(target)

        while(delta > remainingTime) {
            this.tweenChain.currentTween.update(Infinity)
            this.tweenChain.nextTween()
            delta -= remainingTime
            remainingTime = this.tweenChain.currentTween.duration - this.tweenChain.currentTween.elapsed
        }

        this.tweenChain.currentTween.update(delta)
    }

}