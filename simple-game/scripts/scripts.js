var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var background = new Image(); // задний план - космос
var spaceShip = new Image(); // базовая модель корабля
var difficultyMinLevel = 2; // сложность игры, это нижний порог скорости астероидов, чем выше значение, тем быстрее будут все астероиды
var difficultyMaxLevel = 8;
var asteroids = [];
var framesNo = 0; // переменная для подсчета кадров

var gameAnimationStart; // переменная для контроля window.requestAnimationFrame(game)
var startPauseControl; // эта переменная нужна, чтобы предотвратить многократное нажатие пробела и запуск множества window.requestAnimationFrame(game)
var gameTheme; // переменная для основной темы игры

// задний план - космос
background.src = "./img/bg.png";
background.posX = 0;
background.posY = 0;
background.dy = 1;
background.ctx = context;

// рисуем задний план и приводим его в движение
background.draw = (function() {    
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight); 

    this.ctx.drawImage(this, this.posX, this.posY, canvasWidth, canvasHeight);
    this.ctx.drawImage(this, this.posX, this.posY - canvasHeight, canvasWidth, canvasHeight);

    if (this.posY > canvasHeight) {
        this.posY = 0;
    }
    
    this.posY += this.dy;
}).bind(background);

// базовая модель корабля
spaceShip.src = "./img/spaceship.png";
spaceShip.ctx = context;
spaceShip.posX = 570; 
spaceShip.posY = 380;
spaceShip.speed = 20;
spaceShip.width = 100;
spaceShip.height = 70;
spaceShip.draw = (function() {
    this.ctx.drawImage(this, this.posX, this.posY, this.width, this.height);
}).bind(spaceShip);

// обрабатываем нажатие кнопок на клавиатуре
window.addEventListener("keydown", function(e) {
    e.preventDefault();
    console.log(e);    
    if(e.key == "ArrowLeft" && spaceShip.posX > 10) { // движение влево
        spaceShip.posX -= spaceShip.speed;
    }
    if(e.key == "ArrowRight" && spaceShip.posX < 1140) { // движение вправо
        spaceShip.posX += spaceShip.speed;
    }
    if(e.key == "ArrowUp" && spaceShip.posY > 200) { // вверх
        spaceShip.posY -= spaceShip.speed;
    }
    if(e.key == "ArrowDown" && spaceShip.posY < 446) { // вниз
        spaceShip.posY += spaceShip.speed;
    }
    if (e.key == "Escape") { // остановить игру на паузу
        window.cancelAnimationFrame(gameAnimationStart);
        startControl = gameAnimationStart;
        gameTheme.stop();
    }
    if (e.key == " ") { // запустить игру
        if (startControl == gameAnimationStart) { // тут мы предотвращаем многократное нажатие пробела 
            gameAnimationStart = window.requestAnimationFrame(game);
            gameTheme.play();
        }
    }
});

// эта функция нужна для генерации случайных чисел
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// тут создаются астероиды разных размеров
function createRandomAsteroid(src, speed, size) { // базовый класс астероида
    let asteroid = new Image();
    asteroid.src = src || "./img/asteroid.png";
    asteroid.ctx = context;
    asteroid.posX = getRandomValue(5, 1140);
    asteroid.posY = -50;
    asteroid.size = size || getRandomValue(10, 80);
    asteroid.speed = speed || getRandomValue(difficultyMinLevel, difficultyMaxLevel);
    asteroid.draw = (function() {
        this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
    }).bind(asteroid);

    return asteroid;
}

function cutAsteroidsArr() { // это функция нужна, чтобы ограничить массив asteroids
    if(asteroids.length > 20) {
        asteroids.shift();
    }
}

// тут происходит перерисовка канваса и создание всех объектов
function game() {
    context.clearRect(0,0, canvas.width, canvas.height);
    background.draw();
    // console.log(asteroids.length);
    if(!(framesNo % 20)) {
        cutAsteroidsArr();

        asteroids.push(createRandomAsteroid());

        if (framesNo == 500) { // астероид монстр

            cutAsteroidsArr()   

            asteroids.push(createRandomAsteroid("./img/monster.png", 20));
            framesNo = 0;
        }
    }

    framesNo++;

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
    }

    spaceShip.draw();

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].posY += asteroids[i].speed;
    }

    gameAnimationStart =  window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас 
}

gameAnimationStart = window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас 

// фоновая музыка
function BackgroundMusic(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

gameTheme = new BackgroundMusic("./sounds/Blazing-Stars-short.mp3");
gameTheme.play();