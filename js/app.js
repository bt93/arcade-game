// Creates init lives to easily access
let lives = 5;
let score = 0;
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
        this.x = Math.random() * (-310 - -100) + -100;
        this.speed = Math.random() * (310 - 50) + 50;
    }

    // Checks if the player and an ememy touch and 
    // creates failstate if they do
    if (player.x < this.x + 60 &&
        player.x + 36 > this.x &&
        player.y < this.y + 25 &&
        player.y + 30 > this.y) {
        player.x = 202;
        player.y = 400;
        let loseLife = $('.show').last().toggleClass('show hide');
        lives -= 1;
        if (lives < 1) {
            gameOver();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player */
// Constructor function for player
let Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
} 
// Resets player to begining if they reach water
Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.x = 202;
        this.y = 400;
        score += 1;
        $('.score').html(score);
    } 
}
// Draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Moves the player if any of the keys are pressed
    // Also creates boundries for player
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

// Instantiate objects.
// All enemy objects go in an array called allEnemies
// The player object goes in a variable called player
let enemy1 = new Enemy(-300,220,Math.random() * (310 - 50) + 50);
let enemy2 = new Enemy(-500,130,Math.random() * (310 - 50) + 50);
let enemy3 = new Enemy(-310,55,Math.random() * (310 - 50) + 50);
let enemy4 = new Enemy(-310,300,Math.random() * (310 - 50) + 50);

let allEnemies = [enemy1,enemy2,enemy3,enemy4];

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

function initLives() {
    let lives = $('.lives');
    for (let i = 0; i < 5; i++) {
        lives.append('<img src="images/Heart.png" class="show">');
    }
}
initLives()

function gameOver() {
    score = 0;
    $('.score').html(score);
    $('.lives').html('');
    initLives();
    lives = 5;
}