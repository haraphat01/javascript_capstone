import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(config.width / 2, 100, 'logo');

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 60,
      'yellowButton',
      'yellowButton',
      'Play',
      100,
      'Instruction',
    ).setScale(0.2);

    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 40,
      'yellowButton',
      'yellowButton',
      'Options',
      100,
      'Options',
    ).setScale(0.2);

    this.leaderboardButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 140,
      'yellowButton',
      'yellowButton',
      'Leaderboard',
      100,
      'Leaderboard',
    ).setScale(0.2);

    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 240,
      'yellowButton',
      'yellowButton',
      'Credits',
      100,
      'Credits',
    ).setScale(0.2);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }
}
