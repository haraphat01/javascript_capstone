import 'phaser';

import { scene } from './scenes/scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene,
};

new Phaser.Game(gameConfig);