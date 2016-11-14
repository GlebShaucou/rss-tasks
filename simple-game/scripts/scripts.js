var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var background = new Image(); // задний план - космос
var spaceShip = new Image(); // базовая модель корабля
var difficultyMinLevel = 2; // сложность игры, это нижний порог скорости астероидов, чем выше значение, тем быстрее будут все астероиды
var difficultyMaxLevel = 2;
var frequencyAsteroids = 20; // частота кадров для появления новых астероидов
var asteroids = [];
var framesNo = 0; // переменная для подсчета кадров

var gameAnimationStart; // переменная для контроля window.requestAnimationFrame(game)
var startPauseControl; // эта переменная нужна, чтобы предотвратить многократное нажатие пробела и запуск множества window.requestAnimationFrame(game)
var gameTheme; // переменная для основной музыкальной темы игры
var crashSound;
var currentTime; // вкл или выкл музыка

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
spaceShip.posY = 350;
spaceShip.speed = 5;
spaceShip.width = 75;
spaceShip.height = 120;
spaceShip.draw = (function() {
    this.ctx.drawImage(this, this.posX, this.posY, this.width, this.height);

    // this.ctx.rect(this.posX, this.posY, this.width, this.height);
    // this.ctx.stroke();
    // this.ctx.strokeStyle = 'blue';
    // this.ctx.lineWidth = 1;

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

        musicControl("pause");
    }
    if (e.key == " ") { // запустить игру
        if (startControl == gameAnimationStart) { // тут мы предотвращаем многократное нажатие пробела 
            gameAnimationStart = window.requestAnimationFrame(game);

            musicControl("play");
        }
    }
    if (e.code == "KeyS") { // запустить игру
        musicControl();        
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

        // this.ctx.fillStyle = "#ff8989";
        // this.ctx.fillRect(this.posX, this.posY, this.size, this.size);
    }).bind(asteroid);
    asteroid.clear = (function() { // этот метод нужен для удаления астероидов при столкновении
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
    }).bind(asteroid);

    return asteroid;
}

function cutAsteroidsArr() { // это функция нужна, чтобы ограничить массив asteroids
    if(asteroids.length > 20) {
        asteroids.shift();
    }
}

// функция определения удара
function detectContact(ship, astr) {
    if(ship.posX < astr.posX + astr.size && ship.posX + ship.width > astr.posX && ship.posY < astr.posY + astr.size && ship.posY + ship.height > astr.posY) {
        return true;
    }
    return false;
}

// тут происходит перерисовка канваса и создание всех объектов
function game() {
    gameAnimationStart =  window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас

    // context.clearRect(0,0, canvas.width, canvas.height);
    background.draw();
    // console.log(asteroids.length);
    if(!(framesNo % frequencyAsteroids)) {
        cutAsteroidsArr(); // ограничиваем массив asteroids

        asteroids.push(createRandomAsteroid());

        if (framesNo == 500) { // астероид монстр

            cutAsteroidsArr(); // ограничиваем массив asteroids   

            asteroids.push(createRandomAsteroid("./img/monster.png", 20));
            framesNo = 0;
        }
    }

    framesNo++;

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();        
        // определение контакта
        if (detectContact(spaceShip, asteroids[i])) {
            window.cancelAnimationFrame(gameAnimationStart);
            startControl = gameAnimationStart;
            crashSound.play();

            // console.log(asteroids[i].posX);    

            asteroids[i].clear();
            // asteroids.splice(i,1);
            setTimeout(function() {
                asteroids.splice(i,1);
                gameAnimationStart = window.requestAnimationFrame(game);
            }, 1000);
            // gameTheme.play();
            // ship.posX = 570;
            // ship.posY = 350;
            // asteroids.length = 0;
        }
    }

    spaceShip.draw();

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].posY += asteroids[i].speed;
    } 
}

gameAnimationStart = window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас 

// базовый класс для музыки
function Music(src) {
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

// управление музыкой
function musicControl(state) {
    if(state == "pause" && (currentTime == undefined || currentTime != gameTheme.sound.currentTime)) { // если играет музыка и ее нужно отлючить
        gameTheme.stop();
    } else if(state == "play") { // если музыка не играет, но ее нужно вклюячить
        gameTheme.play();
    } else if (currentTime == undefined || currentTime != gameTheme.sound.currentTime) { // в эти случаях играет музыка
        gameTheme.stop();
        currentTime = gameTheme.sound.currentTime;
    } else {
        gameTheme.play();
    }
}

gameTheme = new Music("./sounds/Blazing-Stars-short.mp3");
gameTheme.sound.setAttribute("autoplay", "autoplay");
gameTheme.sound.setAttribute("loop", "loop");
gameTheme.play();

crashSound = new Music("./sounds/crash.mp3");