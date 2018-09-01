/* Enemies */

// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Resets the enemies when they reach the end of canvas
    if (this.x > 550) {
        this.x = -100;
        this.speed = Math.random() * (310 - 50) + 100;
    }

    // Checks if the player and an ememy touch and 
    // creates failstate
    if (player.x < this.x + 60 &&
        player.x + 36 > this.x &&
        player.y < this.y + 25 &&
        player.y + 30 > this.y) {
        player.x = 202;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player */

let Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
} 

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.x = 202;
        this.y = 400;
    } 
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Moves the player if any of the keys are pressed
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    }

    if (key === 'right' && this.x < 400) {
        this.x += 101; 
    }

    if (key === 'up' && this.y > 35) {
        this.y -= 89;
    }

    if (key === 'down' && this.y < 400) {
        this.y += 89;
    }
} 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemy1 = new Enemy(-100,220,Math.random() * (310 - 100) + 50);
let enemy2 = new Enemy(-100,130,Math.random() * (310 - 100) + 50);
let enemy3 = new Enemy(-100,55,Math.random() * (310 - 100) + 50);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

let player = new Player(202,400)


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});