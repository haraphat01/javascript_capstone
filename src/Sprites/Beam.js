import Phaser from 'phaser';

export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    const { x } = scene.man;
    const { y } = scene.man;

    super(scene, x, y, 'beam');

    scene.add.existing(this);

    this.play('beam');
    scene.physics.world.enableBody(this);

    this.setScale(2);
    this.rotation = 90;

    if (scene.angle === 'right') {
      this.body.velocity.x = 250;
    } else if (scene.angle === 'left') {
      this.body.velocity.x = -250;
    } else if (scene.angle === 'up') {
      this.body.velocity.y = -250;
    } else if (scene.angle === 'down') {
      this.body.velocity.y = 250;
    }

    scene.projectiles.add(this);
  }

  update(scene) {
    if (!scene.cameras.main.worldView.contains(this.x, this.y)) {
      this.destroy();
    }
  }
}
