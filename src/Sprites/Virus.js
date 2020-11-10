import Phaser from 'phaser';

export default class Virus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.scene = scene;

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);

    this.setImmovable(false);
    this.setScale(2);
    this.body.setBounce(1);
    this.setCollideWorldBounds(true);

    scene.virusGroup.add(this);

    this.body.velocity.x = -Phaser.Math.Between(10, 100);
  }
}
