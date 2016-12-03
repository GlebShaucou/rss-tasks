var canvas = document.querySelector("#game-area");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var moveKeyStatus = false; // variable needed for arrows keys press processing

var difficultyMinLevel = 2; // сложность игры, это нижний порог скорости астероидов, чем выше значение, тем быстрее будут все астероиды
var difficultyMaxLevel = 8;
var frequencyAsteroids = 30; // frequency, that sets how often should asteroids appear on canvas 
var asteroids = [];
var planets = [];
var framesNo = 0; // variable for counting frames

var gameAnimationStart; // variable to contol window.requestAnimationFrame(game)

var gameTheme; // main music theme
var crashSound; // sound of collision with asteroid
var menuMusic; // music in the main menu state

var lives = document.querySelectorAll(".live"); // spaceship lives array
var livesCount = lives.length; // initial number of lives

var gameScore = 0; // variable counts game score

const planetsSpriteCoords = [
    { coordX: 7, coordY: 12 },
    { coordX: 67, coordY: 12 },
    { coordX: 130, coordY: 12 },
    { coordX: 195, coordY: 12 },
    { coordX: 7, coordY: 94 },
    { coordX: 67, coordY: 94 },
    { coordX: 130, coordY: 94 },
    { coordX: 195, coordY: 94 },
    { coordX: 7, coordY: 174 },
    { coordX: 67, coordY: 174 },
    { coordX: 130, coordY: 174 },
    { coordX: 195, coordY: 174 },
];

// Canvas background - space
let background = new Image(); 
background.src = "./img/bg.png";
background.posX = 0;
background.posY = 0;
background.ctx = context;  
background.dy = 1;  
background.draw = function() { // drawning background and moving it  
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
    this.ctx.drawImage(this, this.posX, this.posY, canvasWidth, canvasHeight);
    this.ctx.drawImage(this, this.posX, this.posY - canvasHeight, canvasWidth, canvasHeight);

    if (this.posY > canvasHeight) {
        this.posY = 0;
    }    

    this.posY += this.dy;
};

// base spaceship model
let spaceship = new Image();
spaceship.src = "./img/spaceship-sprite.png";
spaceship.posX = 570; 
spaceship.posY = 350;
spaceship.ctx = context;
spaceship.coordX = 0; // coordinates on sprite image
spaceship.coordY = 0; // coordinates on sprite image
spaceship.speedX = 0;
spaceship.speedY = 0;
spaceship.width = 75;
spaceship.height = 120;

spaceship.posUpdate = function() {
    this.posX += this.speedX;
    this.posY += this.speedY;
};

spaceship.draw = function() {
    this.ctx.drawImage(this, this.coordX, this.coordY, this.width, this.height, this.posX, this.posY, this.width, this.height);
};

// this function create planets scores
function createPlanetBonus() {
    let planet = new Image();
    let randomPlanetCoords =  planetsSpriteCoords[getRandomValue(0, 12)]; // get random coords of sprite planets
    planet.src = "./img/planets.png"; 
    planet.ctx = context;    
    planet.posX = getRandomValue(5, 1140); // position on canvas
    planet.posY = -50; // position on canvas    
    planet.coordX = randomPlanetCoords.coordX; // position on sprite img                 
    planet.coordY = randomPlanetCoords.coordY; // position on sprite img    
    planet.size = 58;
    planet.speed = getRandomValue(5, 10);
    planet.isBonus = true; // defines if this element is bonus
    planet.score = getRandomValue(10, 20);

    planet.draw = function() {
        this.ctx.drawImage(this, this.coordX, this.coordY, this.size, this.size, this.posX, this.posY, this.size, this.size);
    };

    planet.clear = function() {
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
    };

    return planet;
}

// creating asteroids of various sizes, speed, and view 
function createRandomAsteroid(src, speed, size) {
    let asteroid = new Image();
    asteroid.src = src || "./img/asteroid.png";
    asteroid.ctx = context;
    asteroid.posX = getRandomValue(5, 1140);
    asteroid.posY = -50;
    asteroid.size = size || getRandomValue(30, 101);
    asteroid.speed = speed || getRandomValue(difficultyMinLevel, difficultyMaxLevel);

    asteroid.draw = function() {
        this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
    };

    asteroid.clear = function() { // deleting asteroids after collisions 
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
    };

    return asteroid;
}

// creating explosions
function createExplosion(posX, posY, size) {
    let explosion = new Image();
    explosion.src = "./img/astr_explosion.png";
    explosion.posX = posX;
    explosion.posY = posY;
    explosion.size = size;
    explosion.ctx = context;

    explosion.draw = function() {
        this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
    };

    explosion.clear = function() { 
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
    };

    return explosion;
}

// play menu music
document.addEventListener("DOMContentLoaded", function() {
    menuMusic.play();
});

// listenning events - click on main menu tabs
document.addEventListener("click", function(e) {
    e.preventDefault();

    let targetElement = e.target.className.slice(9);

    if (targetElement === "menu-btn-start-tab") {
        startGame();
        return;
    }

    if (targetElement === "menu-btn-scores-tab") {
        showGameStoryContainer();
        return;
    }

    if (targetElement === "menu-btn-info-tab") {
        showGameInfoContainer();
        return;
    }

    if (targetElement === "menu-btn-confirm-end") {
        confirmEndGame();
        return;
    }
});

// handling with keyboard events
window.addEventListener("keydown", function(e) {
    e.preventDefault();

    /* 
    *   && gameAnimationStart <- this thing prevent multiple spacebar press 
    *   and prevent actions in main menu (for such cases gameAnimationStart == undefined)
    */
  
    if (e.key === "Escape" && gameAnimationStart !== undefined) { // pause game
        window.cancelAnimationFrame(gameAnimationStart);
        startControl = gameAnimationStart;
        displayPauseContainer();
        musicControl("pause");
        return;
    }
    if (e.key === " " && gameAnimationStart !== undefined) { // start game after pause
        if (startControl == gameAnimationStart) { // here will be multiple spacebar press prevented
            gameAnimationStart = window.requestAnimationFrame(game);
            hidePauseContainer();
            musicControl("play");
        }
        return;
    }
    if (e.key === "a") { // on-off music
        musicControl("play");        
        return;
    }
    if (e.key === "s") { // on-off music
        musicControl("pause");        
        return;
    }
    moveKeyStatus = e.key;
});

// handling with keyboard events
window.addEventListener("keyup", function (e) {
    moveKeyStatus = false;
});

// music and sounds base class
function Music(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = 0.5;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
}

Music.prototype.play = function(){
    this.sound.play();
};

Music.prototype.stop = function(){
    this.sound.pause();
};

gameTheme = new Music("./sounds/chapter-I-theme.ogg"); // initiating background music   
gameTheme.sound.setAttribute("loop", "loop"); // cycling music

crashSound = new Music("./sounds/crash.mp3"); // initiating collision sound

menuMusic = new Music("./sounds/prologue.mp3");
menuMusic.sound.setAttribute("loop", "loop");

// drawning canvas and all game objects
function game() {
    gameAnimationStart =  window.requestAnimationFrame(game); // start animation

    background.draw();
    // console.log(framesNo);
    if(!(framesNo % frequencyAsteroids)) {
        cutAsteroidsArr(); // limitting array of object on canvas
        asteroids.push(createRandomAsteroid());

        if (framesNo % 100 === 0) { // time to release planets-scores
            cutAsteroidsArr(); 
            asteroids.push(createPlanetBonus()); // creating random planet
        }

        if (framesNo % 1000 === 0) { // asteroid killer
            cutAsteroidsArr(); 
            asteroids.push(createRandomAsteroid("./img/monster.png", 20));
            // framesNo = 0;
        }
    }

    framesNo++;

    for(let i = 0; i < asteroids.length; i++) {
             
        // asteroid collision
        if (detectContact(spaceship, asteroids[i])) {
            if (asteroids[i].isBonus) { // planet collision
                gameScore += asteroids[i].score;
                setScore(gameScore);
                asteroids.splice(i,1);
                continue;
            }

            var expl = createExplosion(asteroids[i].posX, asteroids[i].posY, asteroids[i].size, asteroids[i].size);

            crashSound.play(); 
            expl.draw();
            window.cancelAnimationFrame(gameAnimationStart);
            startControl = gameAnimationStart;
                 
            if(livesCount > 1) { // decrease amount of lives after collision
                lives[livesCount - 1].style.color = "#000000";
                livesCount--;

                if (livesCount == 2) { // changing spaceship view after collision
                    spaceship.coordX = 76;
                    spaceship.coordY = 0;
                }

                if (livesCount == 1) { // changing spaceship view after collision
                    spaceship.coordX = 150;
                    spaceship.coordY = 0;
                }

                setTimeout(function() {
                    asteroids.splice(i,1);
                    gameAnimationStart = window.requestAnimationFrame(game);
                }, 300);  

            } else { // end game processing
                spaceship.coordX = 226; 
                spaceship.coordY = 0;
                spaceship.width = 200;
                spaceship.height = 250;
                spaceship.draw();
                gameAnimationStart = undefined;
                lives[livesCount - 1].style.color = "#000000";
                livesCount--;
                gameTheme.stop();
                
                setTimeout(function() {
                    showEndGameMenu(gameScore);
                }, 50);

            }                     
        } else {
             asteroids[i].draw(); // drawning objects from asteroids array on canvas
        }
    }

    spaceship.speedX = 0;
    spaceship.speedY = 0;
    if(moveKeyStatus && moveKeyStatus == "ArrowLeft" && spaceship.posX > 10 && gameAnimationStart) { // move spaceship left
        spaceship.speedX = -5;
    }
    if(moveKeyStatus && moveKeyStatus == "ArrowRight" && spaceship.posX < 1140 && gameAnimationStart) { // move spaceship right
        spaceship.speedX = 5;
    }
    if(moveKeyStatus && moveKeyStatus == "ArrowUp" && spaceship.posY > 200 && gameAnimationStart) { // move spaceship up
        spaceship.speedY = -3;
    }
    if(moveKeyStatus && moveKeyStatus == "ArrowDown" && spaceship.posY < 446 && gameAnimationStart) { // move spaceship down
        spaceship.speedY = 3;
    }
    spaceship.posUpdate();
    spaceship.draw(); // drawning spaceship on canvas 

    for(let i = 0; i < asteroids.length; i++) { // moving asteroids down on the canvas
        asteroids[i].posY += asteroids[i].speed;
    } 

    if (framesNo % 48 === 0) {
        setLevelProgress();

        if (framesNo === 12000) {
            alert("You have finished the level!");
            framesNo = 0;
        }
    }
}

// function to control game music theme
function musicControl(state) {
    if (state === "pause" && gameAnimationStart !== undefined) {
        gameTheme.stop();
        return;
    } 

    if (state === "pause" && gameAnimationStart === undefined) {
        menuMusic.stop();
    }

    if (state === "play" && gameAnimationStart !== undefined) {
        gameTheme.play();
    }

    if (state === "play" && gameAnimationStart === undefined) {
        menuMusic.play();
    }
}

// function to get random values
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// i need thi function to limit asteroids array
function cutAsteroidsArr() { 
    if(asteroids.length > 30) {
        asteroids.shift();
    }
}

// this function detects collisions between two objects on canvas
function detectContact(ship, astr) {
    if(ship.posX < astr.posX + astr.size && ship.posX + ship.width > astr.posX && ship.posY < astr.posY + astr.size && ship.posY + ship.height > astr.posY) {
        return true;
    }
    return false;
}

// game start and re-draw of the canvas
function startGame() {
    let gameMenu = document.querySelector("#game-menu");
    gameMenu.style.display = "none";

    context.clearRect(0,0, canvas.width, canvas.height);

    for(let i = 0; i < lives.length; i++) {
        lives[i].style.color = "#e84c3d";
    }
    
    livesCount = lives.length;
    asteroids.length = 0; // cleaning asteroids array if our game begins after previous attempts
    background.draw();

    spaceship.coordX = 0;
    spaceship.coordY = 0;
    spaceship.posX = 570; 
    spaceship.posY = 350;
    spaceship.width = 75;
    spaceship.height = 120;
    spaceship.src = "./img/spaceship-sprite.png";
    spaceship.draw();
    
    menuMusic.stop(); // stop menu music
    gameTheme.play();

    gameScore = 0;
    setScore(0);

    setTimeout(function() {
        gameAnimationStart = window.requestAnimationFrame(game);
    }, 500);
}

// показать основное меню
function showGameMenu() {
    let gameMenu = document.querySelector("#game-menu");
    gameMenu.style.display = "block";
    menuMusic.play();
    displayScoresContainer();
}

// показать игровое меню
function showEndGameMenu(score) {
    let gameEndMenu = document.querySelector("#end-game-menu");
    gameEndMenu.style.display = "block";

    let finalScore = document.querySelector("#final-score");
    finalScore.textContent = score;
}

// действия кнопки ОК в меню окончания игры
function confirmEndGame() {
    let gameEndMenu = document.querySelector("#end-game-menu");
    gameEndMenu.style.display = "none";
    showGameMenu();
}

// показать надпись Pause
function displayPauseContainer() {
    let pauseContainer = document.querySelector("#pause-container");
    pauseContainer.style.display = "block";
}

// спрятать надпись Pause 
function hidePauseContainer() {
    let pauseContainer = document.querySelector("#pause-container");
    pauseContainer.style.display = "none";
}

// обновить очки
function setScore(score) {
    let scoreTable = document.querySelector("#score");
    scoreTable.textContent = score;
}

// показать информацию об игре при нажатии кнопки info
function showGameInfoContainer() {
    let info = document.querySelector("#game-information");
    let story = document.querySelector("#story");
    let scoresContainer = document.querySelector("#scores-container");
    scoresContainer.style.display = "none";
    story.style.display = "none";
    info.style.display = "block";
}

// игровую историю
function showGameStoryContainer() {
    let story = document.querySelector("#story");
    let info = document.querySelector("#game-information");
    let scoresContainer = document.querySelector("#scores-container");
    scoresContainer.style.display = "none";
    story.style.display = "block";
    info.style.display = "none";
}

// displays scores on main menu tab
function displayScoresContainer() {
    let storyContainer = document.querySelector("#story");
    let gameInfoContainer = document.querySelector("#game-information");
    let scoresContainer = document.querySelector("#scores-container");
    storyContainer.style.display = "none";
    gameInfoContainer.style.display = "none";
    scoresContainer.style.display = "block";
}

function setLevelProgress() {
    let levelProgressBar = document.querySelector("#level-progress-state");
    // console.log(levelProgressBar.style.height);
    let progressBarHeight = levelProgressBar.style.height;
    progressBarHeight = progressBarHeight.slice(0, -2);
    progressBarHeight = +progressBarHeight + 1;
    levelProgressBar.style.height = progressBarHeight + "px";
    // console.log(levelProgressBar.style.height);
}