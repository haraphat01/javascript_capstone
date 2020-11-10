import Phaser from 'phaser';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    this.setScale(0.35);

    scene.physics.world.enableBody(this);
    this.hp = 100;
    this.hurt = false;
  }
}
