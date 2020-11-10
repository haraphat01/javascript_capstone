import Phaser from 'phaser';
import PlayerSprite from '../Sprites/PlayerSprite';
import Beam from '../Sprites/Beam';
import Virus from '../Sprites/Virus';
import Mushroom from '../Sprites/Mushroom';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.angle = 'down';
    this.score = 0;
    this.currentWave = 1;
    this.virusAmount = 0;
  }

  preload() {
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [11, 12, 13],
      }),
    });

    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [8, 9, 10],
      }),
    });

    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [4, 5, 6, 7],
      }),
    });

    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('man', {
        frames: [0, 1, 2, 3],
      }),
    });

    this.load.image('terrain', './assets/images/terrain-atlas.png');
    this.load.image('items', './assets/images/items.png');
    this.load.image('mushroom', './assets/images/mushroom.png');

    this.load.tilemapTiledJSON('world', './assets/maps/world.json');

    this.load.spritesheet('beam', './assets/spritesheets/beam.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image('virus', './assets/images/coronavirus.png');

    this.load.bitmapFont(
      'pixelFont',
      './assets/font/font.png',
      './assets/font/font.xml',
    );
  }

  create() {
    this.setMan();
    this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    this.setEnvironment();
    this.setMushrooms();
    this.setColliders();
    this.setProjectiles();
    this.setVirus();
    this.setLabels();
  }

  update() {
    this.physics.overlap(
      this.man,
      this.mushrooms,
      this.restoreHealth,
      null,
      this,
    );

    if (this.keyboard.D.isDown === true) {
      this.man.setVelocityX(128);
      this.angle = 'right';
    }

    if (this.keyboard.A.isDown === true) {
      this.man.setVelocityX(-128);
      this.angle = 'left';
    }

    if (this.keyboard.W.isDown === true) {
      this.man.setVelocityY(-128);
      this.angle = 'up';
    }

    if (this.keyboard.S.isDown === true) {
      this.man.setVelocityY(128);
      this.angle = 'down';
    }

    if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
      this.man.setVelocityX(0);
    }

    if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
      this.man.setVelocityY(0);
    }

    if (this.man.body.velocity.x > 0) {
      this.man.play('right', true);
    } else if (this.man.body.velocity.x < 0) {
      this.man.play('left', true);
    } else if (this.man.body.velocity.y < 0) {
      this.man.play('up', true);
    } else if (this.man.body.velocity.y > 0) {
      this.man.play('down', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyboard.SPACE)) {
      this.shootBeam(this.angle);
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i += 1) {
      const beam = this.projectiles.getChildren()[i];
      beam.update(this);
    }

    if (this.virusAmount === 0) {
      this.spawnVirus(this.currentWave * 10);
      this.currentWave += 1;
      this.man.x = 100;
      this.man.y = 100;
      this.waveLabel.text = `WAVE: ${this.currentWave}`;
    }
  }

  setMan() {
    this.man = new PlayerSprite(this, 100, 100, 'man', 0);
    this.man.setSize(150, 210).setOffset(50, 20);
    this.man.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.man);
  }

  setEnvironment() {
    this.world = this.add.tilemap('world');
    const terrain = this.world.addTilesetImage('terrain-atlas', 'terrain');
    this.world.addTilesetImage('items');

    this.world.createStaticLayer('bot', [terrain], 0, 0).setDepth(-1);
    this.topLayer = this.world.createStaticLayer('top', [terrain], 0, 0);

    this.objLayer = this.world.getObjectLayer('items').objects;

    this.physics.world.setBounds(
      0,
      0,
      this.world.widthInPixels,
      this.world.heightInPixels,
    );
  }

  setMushrooms() {
    this.mushroomLayer = this.objLayer.filter(
      (obj) => obj.gid === 1019 && obj.properties,
    );

    this.mushrooms = this.physics.add.staticGroup();

    this.mushroomLayer.forEach((object) => {
      this.mushroom = new Mushroom(
        this,
        object.x,
        object.y,
        'mushroom',
        0,
        object,
      );
    });
  }

  setProjectiles() {
    this.projectiles = this.add.group();

    this.anims.create({
      key: 'beam',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    });
  }

  setVirus() {
    this.virusGroup = this.add.group();
    this.spawnVirus(10);

    this.physics.add.overlap(
      this.projectiles,
      this.virusGroup,
      this.shootVirus,
      null,
      this,
    );

    this.physics.add.overlap(
      this.man,
      this.virusGroup,
      this.hurtMan,
      null,
      this,
    );
  }

  setLabels() {
    this.scoreLabel = this.add
      .bitmapText(10, 5, 'pixelFont', 'SCORE: 0', 40)
      .setScrollFactor(0, 0);
    this.healthLabel = this.add
      .bitmapText(10, 50, 'pixelFont', 'HEALTH: 100/100', 40)
      .setScrollFactor(0, 0);
    this.waveLabel = this.add
      .bitmapText(10, 95, 'pixelFont', 'WAVE: 1', 40)
      .setScrollFactor(0, 0);
  }

  setColliders() {
    this.physics.add.collider(this.man, this.topLayer);
    this.topLayer.setCollisionByProperty({ collides: true });
  }

  restoreHealth(man, obj) {
    if (man.hp + obj.properties[0].value >= 100) {
      this.man.hp = 100;
    } else {
      this.man.hp += obj.properties[0].value;
    }

    this.healthLabel.text = `HEALTH: ${this.man.hp}/100`;
    obj.destroy();
  }

  shootBeam() {
    this.beam = new Beam(this);
  }

  shootVirus(projectile, virus) {
    projectile.destroy();
    virus.destroy();
    this.score += 5;
    this.scoreLabel.text = `SCORE: ${this.score}`;
    this.virusAmount -= 1;
  }

  hurtMan(man) {
    if (man.hurt) {
      return;
    }
    man.hurt = true;

    this.time.addEvent({
      delay: 2000,
      callback: this.resetHurtTime,
      callbackScope: this,
    });
    man.alpha = 0.5;
    this.man.hp -= 50;

    if (man.hp < 1) {
      this.gameOver();
    }

    this.healthLabel.text = `HEALTH: ${this.man.hp}/100`;
  }

  resetHurtTime() {
    this.man.alpha = 1;
    this.man.hurt = false;
  }

  gameOver() {
    this.scene.start('GameOver', { score: this.score });
    this.scene.destroy();
  }

  spawnVirus(amount) {
    for (let i = 0; i < amount; i += 1) {
      this.virus = new Virus(
        this,
        this.physics.world.bounds.width,
        Phaser.Math.Between(0, this.physics.world.bounds.width),
        'virus',
        0,
      );
      this.virusAmount += 1;
    }
  }
}
