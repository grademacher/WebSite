// =============================================================================
// sprites
// =============================================================================

//
// hero sprite
//
function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');

    this.anchor.set(0.5, 0.5);
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function (direction){
  const SPEED = 200;
  this.body.velocity.x = direction * SPEED
}

Hero.prototype.jump = function(){
  const JUMP_SPEED = 600;
  let canJump = this.body.touching.down;
  if (canJump) {
    this.body.velocity.y = -JUMP_SPEED;
  }
  return canJump;
}

// =============================================================================
// game states
// =============================================================================

PlayState = {};

PlayState.preload = function () {
    this.game.load.json('level:1', 'platformer/data/level01.json');

    this.game.load.image('background', 'platformer/images/background.png');
    this.game.load.image('ground', 'platformer/images/ground.png');
    this.game.load.image('grass:8x1', 'platformer/images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'platformer/images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'platformer/images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'platformer/images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'platformer/images/grass_1x1.png');
    this.game.load.image('hero', 'platformer/images/hero_stopped.png');
};

PlayState.create = function () {
    this.game.add.image(0, 0, 'background');
    this._loadLevel(this.game.cache.getJSON('level:1'));
};

PlayState.init = function(){
  this.game.renderer.renderSession.roundPixels = true;

  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP
  });

  this.keys.up.onDown.add(function () {
        let didJump = this.hero.jump();
    }, this);
};

PlayState.update = function(){
  this._handleCollisions();
  this._handleInput();
}

PlayState._handleInput = function(){
  if (this.keys.left.isDown) {
    this.hero.move(-1);
  }else if (this.keys.right.isDown) {
    this.hero.move(1);
  }else {
    this.hero.move(0);
  }

};

PlayState._handleCollisions = function(){
  this.game.physics.arcade.collide(this.hero, this.platforms);
};

PlayState._loadLevel = function (data) {
    this.platforms = this.game.add.group();
    // spawn all platforms
    data.platforms.forEach(this._spawnPlatform, this);
    // spawn hero and enemies
    this._spawnCharacters({hero: data.hero, spiders: data.spiders});
    //enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
};

PlayState._spawnPlatform = function (platform) {
    let sprite = this.platforms.create(
      platform.x, platform.y, platform.image);
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;
};

PlayState._spawnCharacters = function (data) {
    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};



// =============================================================================
// entry point
// =============================================================================

window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', PlayState);
    game.state.start('play');
};
