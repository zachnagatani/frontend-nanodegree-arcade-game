// Enemies our player must avoid
var Enemy = function(x, y, speedX, speedY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Sets initial location for enemies
    // The x parameter gets passed to .render, which uses it to set
    // the x-coordinate of the enemy object on the canvas
    this.x = x;
    // The y parameter gets passed to our .render method, which uses it to set
    // the y-coordinate of the enemy object on the canvas
    this.y = y;

    // Sets the speed for each instance of the Enemy class
    // Stores the speed parameter in this.speed
    // to be used in our .update method
    this.speedX = speedX;
    this.speedY = speedY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any  movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Takes the x-coordinate of each instance of Enemy
    // on the canvas, then adds the speed parameter (passed in
    // with each instance) to it. This is multiplied by dt
    this.x += this.speedX * dt;


    // If a speedY parameter was passed into the Enemy instance,
    // Move the Enemy instance down the y-axis
    if (this.speedY != null) {
        this.y += this.speedY * dt;

        if (this.x < player.x + 66 &&
            this.x + 66 > player.x &&
            this.y < player.y + 95 &&
            66 + this.y > player.y) {

            player.x = 205;
            player.y = 350;
            this.y = 40;
        }
    }

    // Reverts the position x-axis based Enemy instances when
    // reaching the end of the canvas
    if (this.x >= 400) {
        this.x = 0;
    }

    // Reverts the position of y-axis based Enemy instances
    if (this.y >= 400) {
        this.y = 40;
    }

    // Reverts the player character and the specific instance
    // of the Enemy class upon collision. Adds the specific
    // width and height of player and enemy sprites to calculate
    // an accurate collision
    if (this.speedX != 0 &&
        this.x < player.x + 66 &&
        this.x + 66 > player.x &&
        this.y < player.y + 95 &&
        66 + this.y > player.y) {
        player.x = 205;
        player.y = 350;
        this.x = 0;
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

    // Sets the player's initial location
    // The x parameter gets passed to .render, which uses it to set
    // the x-coordinate of the player object on the canvas
    this.x = x;
    // The y parameter gets passed to .render, which uses it to set
    // the y-coordinate of the player object on the canvas
    this.y = y;
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


        // Store the key-code of the keyup event in a variable
        var key_press = event.keyCode;


        // Reset the player's location on the x-axis if moved
        // off the canvas
        if (this.x < 0 || this.x > 400) {
            this.x = 205;
        }

        // Reset the player's location on the y-axis if moved
        // off the bottom of the canvas
        if (this.y > 400) {
            this.y = 350;
        }

        // Reset the whole game if the player reaches the water
        if (this.y < 40) {
            // Reset the player's location
            this.y = 350;
            this.x = 205;

            // Reset the location of each instance of Enemy
            for (var indexCount = 0; indexCount < allEnemies.length; indexCount++) {
                allEnemies[indexCount].x = 0;
            };

            // Say something stupid.
            alert("Congrats! You drowned.");
        }

        // Move the character left with a left-arrow keyup
        if (key_press === 37){
            this.x = this.x - 70;
        }

        // Move the character up with an up-arrow keyup
        if (key_press === 38){
            this.y = this.y - 70;
        }

        // Move the character right with a right-arrow keyup
        if (key_press === 39){
            this.x = this.x + 70;
        }

        // Move the character down with a down-arrow keyup
        if (key_press === 40){
            this.y = this.y + 70;
        }
};

var Rock = function(x, y){

    this.sprite = 'images/Rock.png';

    this.x = x;
    this.y = y;
};

Rock.prototype.collide = function(){
    if (this.x < player.x + 66 &&
        this.x + 50 > player.x &&
        this.y < player.y + 95 &&
        50 + this.y > player.y) {
        player.x = 205;
        player.y = 350;
    }
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allRocks = [
    rock1 = new Rock(100, 272),
    rock2 = new Rock(300, 150),
];


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create the player, passing in the desired x and y coordinates as paramaters
var player = new Player(205, 350);

// Create and store the instances of Enemy in an array, passing in the desired
// x and y coordinates, as well as desired speed as parameters
var allEnemies = [
    enemy1 = new Enemy(100, 50, 50),
    enemy2 = new Enemy(30, 200, 0, 100),
    enemy3 = new Enemy(20, 125, 200),
    // enemy4 = new Enemy(200, 40, 0, 400),
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
