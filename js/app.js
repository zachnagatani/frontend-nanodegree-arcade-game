// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Sets initial location for enemies
    this.x = x;
    this.y = y;
    // this.speed = speed;

    // Sets the speed for each enemy object
    // this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any  movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x++ * dt;

    if (this.x >= 400) {
        this.x = 0;
    }

    if (this.x < player.x + 66 &&
        this.x + 66 > player.x &&
        this.y < player.y + 95 &&
        66 + this.y > player.y) {
        player.x = 205;
        player.y = 350;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Sets the players initial location
    this.x = x;
    this.y = y;

    // Sets the players speed
    // this.speed = speed;

};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the PLAYER on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control the input of the user
Player.prototype.handleInput = function(allowedKeys) {

        var key_press = event.keyCode;

        if (this.x < 0 || this.x > 400) {
            this.x = 205;
        }

        if (this.y > 400) {
            this.y = 350;
        }

        if (this.y < 40) {
            this.y = 350;
            this.x = 205;
        }

        if (key_press === 37){
            this.x = this.x - 30;
        }

        if (key_press === 38){
            this.y = this.y - 30;
        }

        if (key_press === 39){
            this.x = this.x + 30;
        }

        if (key_press === 40){
            this.y = this.y + 30;
        }

    // Pseudocode...
    // When any key is pressed:
    // 1. Find out which key was pressed
    // 2. If that key was the left arrow, move the character left
    // 3. If that key was the right arrow, move the character right
    // 4. If that key was the down arrow, move the character down
    // 5. If that key was the up arrow, move the character up
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(205, 350);

var allEnemies = [
    enemy1 = new Enemy(100, 50),
    enemy2 = new Enemy(30, 200),
    enemy3 = new Enemy(20, 125),
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
