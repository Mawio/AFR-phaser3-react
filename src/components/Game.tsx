import Phaser from "phaser";
import RaceScene from "../game/scenes/RaceScene";
import { Component } from "react";

export default class Game extends Component {
  componentDidMount() {
    console.log("Creating game...")
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-container",
      scene: [RaceScene],
      backgroundColor: '89CFF0',
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