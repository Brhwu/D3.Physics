class intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemy", 'assets/enemy.png')
        this.load.image("portal", 'assets/portal.png')
        this.load.image("supplies", 'assets/supplies.png')
    }
    create() {
        this.player = this.physics.add.image(100, 200, 'player');
        this.sent1 = this.add.text(50, 50, 'This is you.  You are a roamer of the wasteland looking for supplies.');
        this.sent2 = this.add.text(50, 100, 'When playing use the arrow keys to move.');

        this.sent3 = this.add.text(50, 300, 'This is an image of a zombie, if you encounter one and it touches you, you will die.');
        this.enemy = this.add.image(100, 400, 'enemy');
        //this.portal = this.physics.add.sprite(900, 600, 'portal');
        //this.spawner = this.physics.add.sprite(900, 600, 'spawner');
        this.sent4 = this.add.text(50, 500, 'These are supplies.  You will have to collect 10 of these before you can leave.');
        this.supplies = this.physics.add.image(100, 600, 'supplies');
        this.supplies.setScale(0.5);

        this.sent5 = this.add.text(400, 700, 'This is a portal, you will have to move here to leave.');
        this.portal = this.add.image(650, 650, 'portal')
        this.sent6 = this.add.text(400, 750, 'Click on the portal to play.');
        this.portal.setInterative();
        this.time.delayedCall(6000, () => {
            this.scene.start('level1');     
        }); 

    }

}

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
        //this.portal = this.physics.add.sprite(900, 600, 'portal');
        //this.spawner = this.physics.add.sprite(900, 600, 'spawner');
        this.supplies = this.physics.add.sprite(500, 600, 'supplies');
        this.supplies.setScale(0.5);

        // Store the score in a variable, initialized at 0
        this.score = 0;
        
        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };


        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'Supplies: ' + this.score, style);
    }

    enemyFollows () {
        this.physics.moveToObject(this.enemy, this.player, 50 + (this.score * 10));
    }

    /* enemyDuplicate () {
        this.enemy = this.physics.add.sprite(900, 600, 'enemy');
    } */

    hitSupplies() {
        // Change the position x and y of the coin randomly
        this.supplies.x = Phaser.Math.Between(100, 900);
        this.supplies.y = Phaser.Math.Between(100, 700);
        //this.supplies.destroy();
        //this.player.destroy();
        this.score += 1;

        // Display the updated score on the screen
        this.scoreText.setText('Supplies: ' + this.score);
    }

    hitEnemy() {
        this.player.destroy();
    }

    

    update() {
        this.enemyFollows();

        if (this.score >= 10) {
            this.portal = this.physics.add.sprite(900, 600, 'portal');
        }

        if (this.physics.overlap(this.player, this.supplies)) {
            this.hitSupplies();
            //this.enemyDuplicate();
        }

        if (this.physics.overlap(this.player, this.enemy)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.portal)) {
            this.scene.start('level2');
        }
        if (this.arrow.right.isDown) {
            this.player.x += 4;
        } 
        else if (this.arrow.left.isDown) {
            this.player.x -= 4;
        } 
        if (this.arrow.down.isDown) {
            this.player.y += 4;
        } 
        else if (this.arrow.up.isDown) {
            this.player.y -= 4;
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
        this.load.image("spawner", 'assets/spawner.png')
        this.load.image("supplies", 'assets/supplies.png')
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.arrow = this.input.keyboard.createCursorKeys();

        this.enemy = this.physics.add.sprite(300, 300, 'enemy');
        this.enemy1 = this.physics.add.sprite(600, 500, 'enemy');
        this.enemy2 = this.physics.add.sprite(900, 900, 'enemy');
        //this.portal = this.physics.add.sprite(900, 600, 'portal');
        //this.spawner = this.physics.add.sprite(900, 600, 'spawner');
        this.supplies = this.physics.add.sprite(500, 600, 'supplies');
        this.supplies.setScale(0.5);

        

        // Store the score in a variable, initialized at 0
        this.score = 0;
        
        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };


        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'Supplies: ' + this.score, style);
    }

    enemyFollows () {
        this.physics.moveToObject(this.enemy, this.player, 50 + (this.score * 10));
        this.physics.moveToObject(this.enemy1, this.player, 20 + (this.score * 20));
        this.physics.moveToObject(this.enemy2, this.player, 70 + (this.score * 5));
    }

    /* enemyDuplicate () {
        this.enemy = this.physics.add.sprite(900, 600, 'enemy');
    } */

    hitSupplies() {
        // Change the position x and y of the coin randomly
        this.supplies.x = Phaser.Math.Between(100, 900);
        this.supplies.y = Phaser.Math.Between(100, 700);
        //this.supplies.destroy();
        //this.player.destroy();
        this.score += 1;

        // Display the updated score on the screen
        this.scoreText.setText('Supplies: ' + this.score);
    }

    hitEnemy() {
        this.player.destroy();
    }

    

    update() {
        this.enemyFollows();

        if (this.score >= 10) {
            this.portal = this.physics.add.sprite(900, 600, 'portal');
        }

        if (this.physics.overlap(this.player, this.supplies)) {
            this.hitSupplies();
            //this.enemyDuplicate();
        }

        if (this.physics.overlap(this.player, this.enemy)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy1)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy1)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy2)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.portal)) {
            //this.scene.start('level2');
        }
        if (this.arrow.right.isDown) {
            this.player.x += 4;
        } 
        else if (this.arrow.left.isDown) {
            this.player.x -= 4;
        } 
        if (this.arrow.down.isDown) {
            this.player.y += 4;
        } 
        else if (this.arrow.up.isDown) {
            this.player.y -= 4;
        } 
        
      
    }
}

class intro2 extends Phaser.Scene {
    constructor() {
        super('intro2');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemy", 'assets/enemy.png')
        this.load.image("portal", 'assets/portal.png')
        this.load.image("supplies", 'assets/supplies.png')
    }
    create() {
        this.player = this.physics.add.image(100, 200, 'player');
        this.sent1 = this.add.text(50, 50, 'Careful, this time you have to collect 15 supplies');
        this.sent1.setScale(1.5);
        this.sent2 = this.add.text(50, 100, 'Tip: You can move diagonally to move faster.');
        this.sent2.setScale(1.5);
        this.supplies = this.physics.add.image(100, 600, 'supplies');
        this.supplies.setScale(1);
        this.supplies1 = this.physics.add.image(500, 600, 'supplies');
        this.supplies1.setScale(1);
        this.enemy = this.physics.add.sprite(300, 300, 'enemy');
        this.enemy1 = this.physics.add.sprite(600, 500, 'enemy');
        this.enemy2 = this.physics.add.sprite(900, 600, 'enemy');
        this.enemy3 = this.physics.add.sprite(900, 300, 'enemy');
        this.enemy4 = this.physics.add.sprite(600, 300, 'enemy');
        this.enemy5 = this.physics.add.sprite(300, 500, 'enemy');

        this.portal = this.physics.add.image(650, 700, 'portal')
        this.time.delayedCall(6000, () => {
            this.scene.start('level3');     
        });

    }
}

class level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemy", 'assets/enemy.png')
        this.load.image("portal", 'assets/portal.png')
        this.load.image("spawner", 'assets/spawner.png')
        this.load.image("supplies", 'assets/supplies.png')
        this.load.image("merged", 'assets/merged.png')
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.arrow = this.input.keyboard.createCursorKeys();

        this.enemy = this.physics.add.sprite(300, 300, 'enemy');
        this.enemy1 = this.physics.add.sprite(600, 500, 'enemy');
        this.enemy2 = this.physics.add.sprite(900, 600, 'enemy');
        this.enemy3 = this.physics.add.sprite(900, 300, 'enemy');
        this.enemy4 = this.physics.add.sprite(600, 300, 'enemy');
        this.enemy5 = this.physics.add.sprite(300, 500, 'enemy');
        //this.portal = this.physics.add.sprite(900, 600, 'portal');
        //this.spawner = this.physics.add.sprite(900, 600, 'spawner');
        this.supplies = this.physics.add.sprite(500, 600, 'supplies');
        this.supplies.setScale(0.5);

        // Store the score in a variable, initialized at 0
        this.score = 0;

        this.mergespeed = 0;
        
        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };


        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'Supplies: ' + this.score, style);
    }

    enemyFollows () {
        this.physics.moveToObject(this.enemy, this.player, 50 + (this.score * 10));
        this.physics.moveToObject(this.enemy1, this.player, 20 + (this.score * 10));
        this.physics.moveToObject(this.enemy2, this.player, 70 + (this.score * 5));
        this.physics.moveToObject(this.enemy3, this.player, 90 + (this.score * 1));
        this.physics.moveToObject(this.enemy4, this.player, 30 + (this.score * 5));
        this.physics.moveToObject(this.enemy5, this.player, 30 + (this.score * 5));
    }

    /* enemyDuplicate () {
        this.enemy = this.physics.add.sprite(900, 600, 'enemy');
    } */

    hitSupplies() {
        // Change the position x and y of the coin randomly
        this.supplies.x = Phaser.Math.Between(100, 900);
        this.supplies.y = Phaser.Math.Between(100, 700);
        //this.supplies.destroy();
        //this.player.destroy();
        this.score += 1;

        // Display the updated score on the screen
        this.scoreText.setText('Supplies: ' + this.score);
    }

    hitEnemy() {
        this.player.destroy();
    }

    enemyMerge() {
        mergespeed += 1;
    }

    mergedFollows() {
        this.physics.moveToObject(this.merged, this.player, 70 + (this.score * 10));
    }

    update() {
        this.enemyFollows();
        //this.mergedFollows();

        if (this.score >= 15) {
            this.portal = this.physics.add.sprite(900, 600, 'portal');
        }

        if (this.physics.overlap(this.player, this.supplies)) {
            this.hitSupplies();
            //this.enemyDuplicate();
        }

        if (this.physics.overlap(this.player, this.enemy)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy1)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy2)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy3)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy4)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.enemy5)) {
            this.hitEnemy();
        }
        if (this.physics.overlap(this.player, this.portal)) {
            this.scene.start('intro');
        }
        if (this.arrow.right.isDown) {
            this.player.x += 4;
        } 
        else if (this.arrow.left.isDown) {
            this.player.x -= 4;
        } 
        if (this.arrow.down.isDown) {
            this.player.y += 4;
        } 
        else if (this.arrow.up.isDown) {
            this.player.y -= 4;
        } 
        
      
    }
}

class outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload() {
        this.load.image("player", 'assets/mc.png')
        this.load.image("enemyded", 'assets/enemyded.png')
        this.load.image("portal", 'assets/portal.png')
        this.load.image("supplies", 'assets/supplies.png')
    }
    create() {
        this.player = this.physics.add.image(100, 200, 'player');
        this.sent1 = this.add.text(50, 50, 'Congratulations!');
        this.sent1.setScale(1.5);
        this.sent2 = this.add.text(50, 100, 'With your epic supply collecting skills the zombies have died.');
        this.sent2.setScale(1.5);
        this.supplies = this.physics.add.image(100, 600, 'supplies');
        this.supplies.setScale(1);
        this.supplies1 = this.physics.add.image(500, 600, 'supplies');
        this.supplies1.setScale(1);
        this.enemy = this.physics.add.image(300, 300, 'enemyded');
        this.enemy1 = this.physics.add.image(600, 500, 'enemyded');
        this.enemy2 = this.physics.add.image(900, 600, 'enemyded');
        this.enemy3 = this.physics.add.image(900, 300, 'enemyded');
        this.enemy4 = this.physics.add.image(600, 300, 'enemyded');
        this.enemy5 = this.physics.add.image(300, 500, 'enemyded');

        this.portal = this.physics.add.image(650, 700, 'portal')
        this.sent1 = this.add.text(50, 700, 'Refresh the page to play again.');
        this.sent1.setScale(1.5);
    }
}

new Phaser.Game({
    width: 1000, 
    height: 780, 
    backgroundColor: '#3498db', 
    scene: [intro, level1, level2, intro2, level3, outro], 
    physics: { default: 'arcade' }, 
    parent: 'game', 
});
  