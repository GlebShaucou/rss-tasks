let canvas = document.querySelector("#game-area");
let context = canvas.getContext("2d");
let framesCount = 0; // variable for counting frames
let totalGameScore = 0; // variable counts game score
let moveKeyStatus = false; // variable needed for arrows keys press processing
let frequencyOfAsteroidAppear = 30; // frequency, that sets how often should new asteroid appear on canvas, it could be used as difficulty level
let asteroids = [];
let planets = [];

let gameAnimationStart; // variable to contol window.requestAnimationFrame(gameLoop)
let startControl; // this variable will help to prevent multiple spacebar pressing

let gameTheme; // main music theme
let crashSound; // sound of collision with asteroid
let menuMusic; // music in the main menu state

let lives = document.querySelectorAll(".live"); // spaceship lives array
let livesCount = lives.length; // initial number of lives

const LEVEL_LENGTH = 1000;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const MIN_ASTEROIDS_SPEED = 2; 
const MAX_ASTEROIDS_SPEED = 8;
const PLANETS_SPRITE_COORDINATES = [
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
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    this.ctx.drawImage(this, this.posX, this.posY, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.drawImage(this, this.posX, this.posY - CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (this.posY > CANVAS_HEIGHT) {
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

// game start and re-draw of the canvas
function startGame() {
    let gameMenu = document.querySelector("#game-menu");
    gameMenu.style.display = "none";

    reloadAndRedrawGameCanvas(); 

    /* setTimeout is used because it is needed to give you as a player some time to comprehend a situation */
    setTimeout(function() { // a small delay before the game loop starts
        gameAnimationStart = window.requestAnimationFrame(gameLoop);
    }, 500);
}

// drawning canvas and all game objects
function gameLoop() {
    gameAnimationStart =  window.requestAnimationFrame(gameLoop); // start animation

    manageAppearOfItemsOnCanvas(framesCount, frequencyOfAsteroidAppear);

    background.draw();

    for(let i = 0; i < asteroids.length; i++) {          
        // asteroid collision
        if (detectCollisionOfTwoObj(spaceship, asteroids[i])) {
            if (asteroids[i].isBonus) { // planet collision
                totalGameScore += asteroids[i].score;
                setAndRefreshScore(totalGameScore);
                asteroids.splice(i,1); // delete planet-bonus wich has catched by spaceship
                continue;
            }

            crashSound.play(); 
            
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

                /* setTimeout is used because it is needed to give you as a player some time to comprehend a situation */
                setTimeout(function() {
                    asteroids.splice(i,1); // delete asteroid wich has crashed with spaceship
                    gameAnimationStart = window.requestAnimationFrame(gameLoop);
                }, 300);  

            } else { 
                endGameProcessWhenGameOver();
            }                     
        } else {
             asteroids[i].draw(); // drawning objects from asteroids array on canvas
        }
    }

    spaceship.draw(); // drawning spaceship on canvas 

    moveCharacterOnCanvas();

    moveObjectsOnCanvas();

    framesCount = manageWhenLevelEndReached(framesCount);
}

function manageAppearOfItemsOnCanvas(frames, difficulty) {
    if(frames % difficulty === 0) {
        cutAsteroidsArr(); // limitting array of object on canvas
        asteroids.push(createRandomAsteroid());

        if (frames % 50 === 0) { // time to release planets-scores
            cutAsteroidsArr(); 
            asteroids.push(createPlanetBonus()); // creating random planet
        }

        if (frames % 1000 === 0) { // asteroid killer
            cutAsteroidsArr(); 
            asteroids.push(createRandomAsteroid("./img/monster.png", 20));
            // framesCount = 0;
        }
    }
}

// creating asteroids of various sizes, speed, and view 
function createRandomAsteroid(src, speed, size) {
    let asteroid = new Image();
    asteroid.src = src || "./img/asteroid.png";
    asteroid.ctx = context;
    asteroid.posX = getRandomValue(5, 1140);
    asteroid.posY = -50;
    asteroid.size = size || getRandomValue(30, 101);
    asteroid.speed = speed || getRandomValue(MIN_ASTEROIDS_SPEED, MAX_ASTEROIDS_SPEED);

    asteroid.draw = function() {
        this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
    };

    asteroid.clear = function() { // deleting asteroids after collisions 
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
    };

    return asteroid;
}

// this function create planets scores
function createPlanetBonus() {
    let planet = new Image();
    let randomPlanetCoords =  PLANETS_SPRITE_COORDINATES[getRandomValue(0, 12)]; // get random coords of sprite planets
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

// moving objects down on the canvas
function moveObjectsOnCanvas() {
    for(let i = 0; i < asteroids.length; i++) { 
        asteroids[i].posY += asteroids[i].speed;
    } 
}

function moveCharacterOnCanvas() {
    spaceship.speedX = 0;
    spaceship.speedY = 0;
    /* move spaceship left, and limit spaceship from left side of canvas */
    if(moveKeyStatus && moveKeyStatus == "ArrowLeft" && spaceship.posX > 10 && gameAnimationStart) { 
        spaceship.speedX = -5;
    }
    /* move spaceship right, and limit spaceship from right side of canvas */
    if(moveKeyStatus && moveKeyStatus == "ArrowRight" && spaceship.posX < 1140 && gameAnimationStart) { 
        spaceship.speedX = 5;
    }
    /* move spaceship up, and limit spaceship from top side of canvas */
    if(moveKeyStatus && moveKeyStatus == "ArrowUp" && spaceship.posY > 100 && gameAnimationStart) { 
        spaceship.speedY = -3;
    }
    /* move spaceship down, and limit spaceship from top side of canvas */
    if(moveKeyStatus && moveKeyStatus == "ArrowDown" && spaceship.posY < 375 && gameAnimationStart) { 
        spaceship.speedY = 3;
    }
    spaceship.posUpdate();
}

function endGameProcessWhenGameOver() {
    spaceship.coordX = 226; 
    spaceship.coordY = 0;
    spaceship.width = 200;
    spaceship.height = 250;
    spaceship.draw();

    window.cancelAnimationFrame(gameAnimationStart);
    gameAnimationStart = undefined;

    lives[livesCount - 1].style.color = "#000000";
    livesCount--;

    gameTheme.stop();
    
    /* setTimeout is used because it is needed to give a player some time to comprehend a situation */
    setTimeout(function() {
        showGameOverMenu(totalGameScore);
    }, 300);
}

function manageWhenLevelEndReached(frames) {
    /* 250 - is height of div.level-progress-container, total length of level progress bar */
    if (frames % (LEVEL_LENGTH / 250) === 0) { 
        if (frames === LEVEL_LENGTH) {
            showEndLevelContainer();
            gameTheme.stop();
        }
        setLevelProgress();
    }
    return frames + 1;
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

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// I need this function to limit asteroids array
function cutAsteroidsArr() { 
    if(asteroids.length > 30) {
        asteroids.shift();
    }
}

// this function detects collisions between objects on canvas
function detectCollisionOfTwoObj(character, obstacle) {
    if(character.posX < obstacle.posX + obstacle.size && character.posX + character.width > obstacle.posX && character.posY < obstacle.posY + obstacle.size && character.posY + character.height > obstacle.posY) {
        return true;
    }
    return false;
}

function reloadAndRedrawGameCanvas() {
    let levelProgressBar = document.querySelector("#level-progress-state");
    levelProgressBar.style.height = "0px";

    context.clearRect(0,0, canvas.width, canvas.height);
    background.draw();

    spaceship.coordX = 0;
    spaceship.coordY = 0;
    spaceship.posX = 570; 
    spaceship.posY = 350;
    spaceship.width = 75;
    spaceship.height = 120;
    spaceship.draw();
    
    menuMusic.stop(); 
    gameTheme.play();

    for(let i = 0; i < lives.length; i++) {
        lives[i].style.color = "#e84c3d";
    }
    
    livesCount = lives.length;
    asteroids.length = 0; // cleaning asteroids array if our game begins after previous attempts
    totalGameScore = 0;
    framesCount = 0;

    setAndRefreshScore(totalGameScore);
}

// main menu with scores, story and information
function showGameMenu() {
    let gameMenu = document.querySelector("#game-menu");
    gameMenu.style.display = "block";
    menuMusic.play();
    // displayScoresContainer();
}

// dialog menu that wil be shown when lives are over
function showGameOverMenu(score) {
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

function displayPauseContainer() {
    let pauseContainer = document.querySelector("#pause-container");
    pauseContainer.style.display = "block";
}

function hidePauseContainer() {
    let pauseContainer = document.querySelector("#pause-container");
    pauseContainer.style.display = "none";
}

function setAndRefreshScore(score) {
    let scoreTable = document.querySelector("#score");
    scoreTable.textContent = score;
}

function showGameInfoContainer() {
    let info = document.querySelector("#game-information");
    let story = document.querySelector("#game-story-container");
    // let scoresContainer = document.querySelector("#scores-container");
    // scoresContainer.style.display = "none";
    story.style.display = "none";
    info.style.display = "block";
}

function showGameStoryContainer() {
    let story = document.querySelector("#game-story-container");
    let info = document.querySelector("#game-information");
    // let scoresContainer = document.querySelector("#scores-container");
    // scoresContainer.style.display = "none";
    story.style.display = "block";
    info.style.display = "none";
}

// function displayScoresContainer() {
//     let storyContainer = document.querySelector("#game-story-container");
//     let gameInfoContainer = document.querySelector("#game-information");
//     // let scoresContainer = document.querySelector("#scores-container");
//     // scoresContainer.style.display = "block";
//     storyContainer.style.display = "none";
//     gameInfoContainer.style.display = "none";
// }

function setLevelProgress() {
    let levelProgressBar = document.querySelector("#level-progress-state");
    let progressBarHeight = levelProgressBar.style.height;
    progressBarHeight = progressBarHeight.slice(0, -2);
    progressBarHeight = +progressBarHeight + 1;
    levelProgressBar.style.height = progressBarHeight + "px";
}

function showEndLevelContainer() {
    window.cancelAnimationFrame(gameAnimationStart);
    gameAnimationStart = undefined;

    let nextLevelDesrcContainer = document.querySelector("#level-end-container");
    nextLevelDesrcContainer.style.display = "block";
}

function beginNewGameBecauseNoFurtherLevelsAvailable() {
    let nextLevelDesrcContainer = document.querySelector("#level-end-container");
    nextLevelDesrcContainer.style.display = "none";

    showGameMenu();
}

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

menuMusic = new Music("./sounds/prologue.mp3");
menuMusic.sound.setAttribute("loop", "loop");
gameTheme = new Music("./sounds/chapter-I-theme.ogg"); // initiating background music   
gameTheme.sound.setAttribute("loop", "loop"); // cycling music
crashSound = new Music("./sounds/crash.mp3"); // initiating collision sound

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

    if (targetElement === "menu-btn-continue") {
        beginNewGameBecauseNoFurtherLevelsAvailable();
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
  
    if (e.key === "Escape" && gameAnimationStart !== undefined) { // pause game, I use here e.key because it was advise from MDN documentation
        window.cancelAnimationFrame(gameAnimationStart);
        startControl = gameAnimationStart;
        displayPauseContainer();
        musicControl("pause");
        return;
    }
    if (e.key === " " && gameAnimationStart !== undefined) { // start game after pause
        if (startControl == gameAnimationStart) { // here will be multiple spacebar press prevented
            gameAnimationStart = window.requestAnimationFrame(gameLoop);
            hidePauseContainer();
            musicControl("play");
        }
        return;
    }
    if (e.keyCode === 65) { // on music, I use here e.keyCode because it allows to use keys in various keyboards layouts
        musicControl("play");        
        return;
    }
    if (e.keyCode === 83) { // off music
        musicControl("pause");        
        return;
    }
    moveKeyStatus = e.key;
});

// handling with keyboard events
window.addEventListener("keyup", function (e) {
    moveKeyStatus = false;
});