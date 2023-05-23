// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The three methods currently empty
    preload() {
        this.load.image("player", 'assets/mc.png')
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.arrow.right.isDown) {
            this.player.x += 3;
        } 
        else if (this.arrow.left.isDown) {
            this.player.x -= 3;
        } 
        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } 
        else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        } 
      
    }
}

new Phaser.Game({
    width: 1920, 
    height: 1080, 
    backgroundColor: '#3498db', 
    scene: mainScene, 
    physics: { default: 'arcade' }, 
    parent: 'game', 
});
  