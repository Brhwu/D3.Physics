class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemy", 'assets/enemy.png')
        this.load.image("portal", 'assets/portal.png')
        this.load.image("spawner", 'assets/spawner.png')
        this.load.image("supplies", 'assets/supplies.png')
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.arrow = this.input.keyboard.createCursorKeys();

        this.enemy = this.physics.add.sprite(300, 300, 'enemy');
        this.portal = this.physics.add.sprite(900, 600, 'portal');
        this.spawner = this.physics.add.sprite(900, 600, 'spawner');

        // Store the score in a variable, initialized at 0
        this.score = 0;
        
        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };


        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    }

    enemyFollows () {
        this.physics.moveToObject(this.enemy, this.player, 100);
    }

    enemyDuplicate () {
        this.enemy = this.physics.add.sprite(900, 600, 'enemy');
    }

    hit() {
        // Change the position x and y of the coin randomly
        this.enemy.x = Phaser.Math.Between(100, 600);
        this.enemy.y = Phaser.Math.Between(100, 300);
        this.enemy.destroy();
        this.player.destroy();
        // Increment the score by 10
        this.score += 10;

        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);
    }

    

    update() {
        this.enemyFollows();

        if (this.physics.overlap(this.player, this.enemy)) {
            this.hit();
        }
        if (this.physics.overlap(this.player, this.portal)) {
            this.scene.start('level2');
        }
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

class level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemy", 'assets/enemy.png')
        this.load.image("portal", 'assets/portal.png')
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.arrow = this.input.keyboard.createCursorKeys();

        this.enemy = this.physics.add.sprite(300, 300, 'enemy');
        this.portal = this.physics.add.sprite(900, 600, 'portal')
    }

    hit() {
        // Change the position x and y of the coin randomly
        this.enemy.x = Phaser.Math.Between(100, 600);
        this.enemy.y = Phaser.Math.Between(100, 300);
        this.enemy.destroy();
    }
    

    update() {
        if (this.physics.overlap(this.player, this.enemy)) {
            this.hit();
        }
        if (this.physics.overlap(this.player, this.portal)) {
            //this.scene.start('level2');
        }
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
    width: 1000, 
    height: 780, 
    backgroundColor: '#3498db', 
    scene: [level1, level2], 
    physics: { default: 'arcade' }, 
    parent: 'game', 
});
  