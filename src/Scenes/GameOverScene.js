import Phaser from 'phaser';
import Button from '../Objects/Button';
import { postScore } from '../scoreAPI/scoreAPI';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.model = this.sys.game.globals.model;
    this.score = data.score;
  }

  create() {
    const gameScene = this.scene.get('Game');

    this.add.image(this.game.config.width / 2, 100, 'logo');

    this.add.text(this.game.config.width / 2 - 200, 200, 'Game Over', {
      fontFamily: 'monospace',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#ffb132',
      align: 'center',
    });

    this.add.text(
      this.game.config.width / 2 - 200,
      300,
      `Your score: ${this.score}`,
      {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffb132',
        align: 'center',
      },
    );

    this.homeButton = new Button(
      this,
      this.game.config.width * 0.25,
      this.game.config.height * 0.8,
      'yellowButton',
      'yellowButton',
      'Menu',
      100,
      'Title',
    ).setScale(0.15);

    this.restartButton = new Button(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'yellowButton',
      'yellowButton',
      'Restart',
      100,
      'Instruction',
      () => {
        gameScene.angle = 'down';
        gameScene.score = 0;
        gameScene.currentWave = 1;
        gameScene.virusAmount = 0;
      },
    ).setScale(0.15);

    postScore(this.model.user, this.score);

    this.leaderboard = new Button(
      this,
      this.game.config.width * 0.75,
      this.game.config.height * 0.8,
      'yellowButton',
      'yellowButton',
      'Submit Score',
      100,
      'Leaderboard',
    ).setScale(0.15);
  }
}
