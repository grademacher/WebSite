function Hero(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'hero');
  this.anchor.set(0.5, 0.5);
}

Hero.prototype = Object.create(Paser.sprite.prototype);
Hero.prototype.constructor = Hero;


PlayState = {};

PlayState.preload = function(){
  this.game.load.json('level:1', 'platformer/data/level01.json');
  this.game.load.image('background', 'platformer/images/background.png');
  this.game.load.image('ground', 'platformer/images/ground.png');
  this.game.load.image('grass:8x1', 'platformer/images/grass_8x1.png');
  this.game.load.image('grass:6x1', 'platformer/images/grass_6x1.png');
  this.game.load.image('grass:4x1', 'platformer/images/grass_4x1.png');
  this.game.load.image('grass:2x1', 'platformer/images/grass_2x1.png');
  this.game.load.image('grass:1x1', 'platformer/images/grass_1x1.png');
  this.game.load.image('hero', 'platformer/images/hero_stopped.png');
}

PlayState.create = function(){
  this.game.add.image(0, 0, 'background');
  this._loadLevel(this.game.cache.getJSON('level:1'));
}

PlayState._loadLevel = function(data){
  // spawn all platforms
  data.platforms.forEach(this._spawnPlatform, this);
  // spawn hero and enemies
  this._spawnCharacters({hero: data.hero, spiders: data.spiders});
}

PlayState._spawnCharacters = function(data){
  this.hero = new Hero(this.game, data.hero.x, data.hero.y);
  this.game.add.existing(this.hero);
}


window.onload = function (){
  let game =  new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
