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
    // for movement speed on the x and y axes
    // Stores the speed parameter in this.speedX and this.speedY
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

    // If the speedX paramater is not 0, run this if statement
    if (this.speedX !== 0) {

            // Takes the x-coordinate of each instance of Enemy
            // on the canvas, then adds the speed parameter (passed in
            // with each instance) to it. This is multiplied by dt
            this.x += this.speedX * dt;

            // Reverts the position x-axis based Enemy instances when
            // reaching the end of the canvas
            if (this.x >= 400) {
                this.x = 0;
            }

            // Reverts the player character and the specific instance
            // of the Enemy class (on the x-axis) upon collision. Adds the specific
            // width and height of player and enemy sprites to calculate
            // an accurate collision
            if (this.x < player.x + 66 &&
            this.x + 66 > player.x &&
            this.y < player.y + 95 &&
            66 + this.y > player.y) {

            player.x = 205;
            player.y = 350;

            this.x = 0;
            }
    }

    // If there is a speedY-paramater passed into the instance, run this if statement
    if (this.speedY !== undefined) {

        // Move the Enemy instance down the y-axis
        this.y += this.speedY * dt;

        // Reverts the position of y-axis based Enemy instances
        if (this.y >= 400) {
            this.y = 40;
        }

        // Reverts the player character and the specific instance
        // of the Enemy class (on the y-axis) upon collision. Adds the specific
        // width and height of player and enemy sprites to calculate
        // an accurate collision
        if (this.x < player.x + 66 &&
            this.x + 66 > player.x &&
            this.y < player.y + 95 &&
            66 + this.y > player.y) {

            player.x = 205;
            player.y = 350;
            this.y = 40;
        }
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
    this.sprite = 'images/char-cat-girl.png';

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
        var tileWidth = 101;
        var tileHeight = 83;


        // Reset the player's location on the x-axis if moved
        // off the canvas
        if (this.x + 5 < 0 || this.x > 410) {
            this.x = 205;
        }

        // Reset the player's location on the y-axis if moved
        // off the bottom of the canvas
        if (this.y + 95 > 400) {
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
            }

            // Say something stupid.
            alert("Congrats! You drowned.");
        }

        // Move the character left with a left-arrow keyup
        if (key_press === 37){
            this.x = this.x - tileWidth;
        }

        // Move the character up with an up-arrow keyup
        if (key_press === 38){
            this.y = this.y - tileHeight;
        }

        // Move the character right with a right-arrow keyup
        if (key_press === 39){
            this.x = this.x + tileWidth;
        }

        // Move the character down with a down-arrow keyup
        if (key_press === 40){
            this.y = this.y + tileHeight;
        }
};


// The constructor of the Rock class
var Rock = function(x, y){

    // Set the image for each rock
    this.sprite = 'images/Rock.png';

    // Location parameters for each rock
    this.x = x;
    this.y = y;
};

Rock.prototype.collide = function(){

    // Reset player position upon collision with a rock
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


// Constructor for the Star class
var Star = function(x, y) {

    // Set the image for each star
    this.sprite = 'images/Star.png';

    // Parameters for location of each star
    this.x = x;
    this.y = y;

};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.collide = function () {
    // TODO: Loop through allStars array and erase/move corresponding enemy
    // for (indexCount = 0; indexCount < allStars.length; indexCount++ ){
    //     var removeEnemy = allEnemies[indexCount];
    //     if (this.x < player.x + 66 &&
    //         this.x + 40 > player.x &&
    //         this.y < player.y + 95 &&
    //         40 + this.y > player.y) {

    //         removeEnemy.x = -400;

    //     }
    // }

    // Upon collision with a star, remove the 4th and 5th instance
    // of the Enemy class
    for (indexCount = 0; indexCount < allStars.length; indexCount++ ){
        if (this.x < player.x + 66 &&
            this.x + 40 > player.x &&
            this.y < player.y + 95 &&
            40 + this.y > player.y) {
            allEnemies[3].y = -400;
            allEnemies[4].x = -400;

        }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Create and store the instances of Enemy in an array, passing in the desired
// x and y coordinates, as well as desired speed as parameters
var allEnemies = [
    enemy1 = new Enemy(100, 50, 50),
    enemy2 = new Enemy(30, 40, 0, 100),
    enemy3 = new Enemy(20, 125, 150),
    enemy4 = new Enemy(0, 250, 400),
    enemy5 = new Enemy(375, 40, 0, 400),
];

// Instantiate and store Rock instances and pass their x and y paramaters
var allRocks = [
    rock1 = new Rock(100, 272),
    rock2 = new Rock(300, 150),
];

// Instantiate and store Star instances and pass their x and y parameters
var allStars = [
    star1 = new Star(350, 250),
];

// Place the player object in a variable called player
// Create the player, passing in the desired x and y coordinates as paramaters
var player = new Player(205, 350);


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
