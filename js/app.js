// Global Variables
var PLAYER_WIDTH = 50;
var PLAYER_HEIGHT = 95;

// Superclass for other entities besides enemy
// Takes in x and y coordinates as parameters
var Entity = function(x, y) {
    // Sets the entity's initial location
    // The x parameter gets passed to .render, which uses it to set
    // the x-coordinate of the subclass instances' object on the canvas
    this.x = x;
    // The y parameter gets passed to .render, which uses it to set
    // the y-coordinate of the subclass instances' object on the canvas
    this.y = y;

    this.startX = x;
    this.startY = y;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speedX, speedY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // // Sets initial location for enemies
    // // The x parameter gets passed to .render, which uses it to set
    // // the x-coordinate of the enemy object on the canvas
    // this.x = x;
    // // The y parameter gets passed to our .render method, which uses it to set
    // // the y-coordinate of the enemy object on the canvas
    // this.y = y;

    Entity.call(this, x, y, speedX, speedY);



    // Sets the speed for each instance of the Enemy class
    // for movement speed on the x and y axes
    // Stores the speed parameter in this.speedX and this.speedY
    // to be used in our .update method
    this.speedX = speedX;
    this.speedY = speedY;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any  movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var ENEMY_WIDTH = 66;
    var ENEMY_HEIGHT = 66;

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
        if (this.x < player.x + PLAYER_WIDTH &&
            this.x + ENEMY_WIDTH > player.x &&
            this.y < player.y + PLAYER_HEIGHT &&
            ENEMY_HEIGHT + this.y > player.y) {

            player.x = player.startX;
            player.y = player.startY;

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
        if (this.x < player.x + PLAYER_WIDTH &&
            this.x + ENEMY_WIDTH > player.x &&
            this.y < player.y + PLAYER_HEIGHT &&
            ENEMY_HEIGHT + this.y > player.y) {

            player.x = player.startX;
            player.y = player.startY;
            this.y = 40;
        }
    }
};


// Player subclass of Entity
// Takes in x and y paramaters to be passed to Entity
// Declares what sprite to be used in render function
var Player = function(x, y) {

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';

    // Call the Entity superclass in the contest of the
    // specific instance of Player, and pass the
    // x and y parameters to Entity
    Entity.call(this, x, y);
};

// Delegate the Player prototype to the Entity prototype
Player.prototype = Object.create(Entity.prototype);

// Recreate the constructor for Player.prototype
Player.prototype.constructor = Player;

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Control the input of the user
Player.prototype.handleInput = function(allowedKeys) {

    var tileWidth = 101;
    var tileHeight = 83;

    switch (allowedKeys) {
        case 'left':
            // Reset the player's location on the x-axis if moved
            // off the canvas
            if (this.x - PLAYER_WIDTH < 0) {
                break;
            }
            this.x = this.x - tileWidth;
            break;

        case 'up':
            // Reset the whole game if the player reaches the water
            if (this.y < 40) {
                // Reset the player's location
                this.y = this.startY + PLAYER_HEIGHT;
                this.x = this.startX;

                // Reset the location of each instance of Enemy
                for (var indexCount = 0; indexCount < allEnemies.length; indexCount++) {

                    allEnemies[indexCount].x = allEnemies[indexCount].startX;
                    allEnemies[indexCount].y = allEnemies[indexCount].startY;
                }

                for (var indexCount = 0; indexCount < allStars.length; indexCount++) {
                    allStars[indexCount].x = allStars[indexCount].startX;
                    allStars[indexCount].y = allStars[indexCount].startY;
                }

                // Say something stupid.
                alert("Congrats! You drowned.");
            }
            this.y = this.y - tileHeight;
            break;

        case 'right':
            // Reset the player's location on the x-axis if moved
            // off the canvas
            if (this.x + 100 > 505) {
                break;
            }
            this.x = this.x + tileWidth;
            break;

        case 'down':
            // Reset the player's location on the y-axis if moved
            // off the bottom of the canvas
            if (this.y + PLAYER_HEIGHT > 450) {
                break;
            }
            this.y = this.y + tileHeight;
            break;
    }

};


// Rock subclass of Entity
var Rock = function(x, y) {

    // Set the image for each rock
    this.sprite = 'images/Rock.png';

    // Call the Entity superclass in the contest of the
    // specific instance of Rock, and pass the
    // x and y parameters to Entity
    Entity.call(this, x, y);
};

// Setup the Rock prototype chain
Rock.prototype = Object.create(Entity.prototype);

// Recreate the Rock prototype constructor
Rock.prototype.constructor = Rock;

// Handle player collision with Rock instances
Rock.prototype.collide = function() {

    var ROCK_WIDTH = 50;
    var ROCK_HEIGHT = 50;

    // Reset player position upon collision with a rock
    if (this.x < player.x + PLAYER_WIDTH &&
        this.x + ROCK_WIDTH > player.x &&
        this.y < player.y + PLAYER_HEIGHT &&
        ROCK_HEIGHT + this.y > player.y) {
        player.x = player.startX;
        player.y = player.startY;
    }
};


// Star subclass of Entity
var Star = function(x, y) {

    // Set the image for each star
    this.sprite = 'images/Star.png';

    // Call the Entity superclass in the contest of the
    // specific instance of Star, and pass the
    // x and y parameters to Entity
    Entity.call(this, x, y);

};

// Set up the Star prototype chain
Star.prototype = Object.create(Entity.prototype);

// Recreate the Star prototype constructor
Star.prototype.constructor = Star;

// Handle player collision with Star instances
Star.prototype.collide = function() {

    var STAR_WIDTH = 40;
    var STAR_HEIGHT = 40;

    // Upon collision with a star, remove the 4th and 5th instance
    // of the Enemy class
    for (indexCount = 0; indexCount < allStars.length; indexCount++) {
        if (this.x < player.x + PLAYER_WIDTH &&
            this.x + STAR_WIDTH > player.x &&
            this.y < player.y + PLAYER_HEIGHT &&
            STAR_HEIGHT + this.y > player.y) {
            allEnemies[3].y = -400;
            allEnemies[4].x = -400;
            this.x = this.x - 1000;

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