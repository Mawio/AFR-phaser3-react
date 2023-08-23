import Phaser from "phaser";
import RaceScene from "../../game/scenes/RaceScene";
import { Component } from "react";
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';

export default class Game extends Component {
  componentDidMount() {
    console.log("Creating game...")
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-container",
      scene: [RaceScene],
      backgroundColor: '071701',
      plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }
        ]
    }
    };

    new Phaser.Game(config);
    console.log("Game created.")
  }

  shouldComponentUpdate() {
    return false;
  }

  public render() {
    return <div id="phaser-container" />;
  }
}