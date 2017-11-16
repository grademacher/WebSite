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
}

PlayState.create = function(){
  this.game.add.image(0, 0, 'background');
  this._loadLevel(this.game.cache.getJSON('level:1'));
}

PlayState._loadLevel = function(data){

}

window.onload = function (){
  let game =  new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
