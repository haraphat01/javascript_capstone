import Phaser from 'phaser';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export default {
  type: Phaser.AUTO,
  parent: 'phaser-game',

  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,

  render: {
    pixelArt: true,
  },

  dom: {
    createContainer: true,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
