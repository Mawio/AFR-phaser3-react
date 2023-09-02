import Phaser from "phaser";
import RaceScene from "../../game/RaceScene";
import { Component } from "react";
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';

export default class Game extends Component {
  private game: Phaser.Game

  componentDidMount() {
    console.log("Creating game...")
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-container",
      scene: [RaceScene],
      backgroundColor: '040b14',
      plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }
        ]
    }
    };

    this.game = new Phaser.Game(config);
    console.log("Game created.")
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.game.destroy(false)
  }

  public render() {
    return <div className="fade-in" style={{position:"fixed", top:"0px"}} id="phaser-container" />;
  }
}