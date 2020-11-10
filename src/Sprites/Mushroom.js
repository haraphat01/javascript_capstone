import Phaser from 'phaser';

export default class Virus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, obj) {
    super(scene, x, y, texture, frame, obj);

    this.scene = scene;

    this.properties = obj.properties;

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.mushrooms.add(this);
  }
}
