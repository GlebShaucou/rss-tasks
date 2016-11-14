var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var difficultyLevels = [2, 3, 4];

// задний план - космос
var background = new Image();

background.src = './img/bg.png';
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
function SpaceShipBaseObject(posX, posY, color, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.width = width;
    this.height = height;

    this.ctx = context;

    this.draw =(function() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }).bind(this);

    this.update = (function() {
        return setInterval(this.draw, 1);
    }).bind(this);
}

var spaceShip = new SpaceShipBaseObject(575, 430, "#ff8989", 50, 50);
var spaceShipSpeed = 14;
var asteroid;

// обрабатываем нажатие кнопок на клавиатуре
window.addEventListener("keydown", function(e) {
    e.preventDefault();
    
    if(e.key == "ArrowLeft" && spaceShip.posX > 10) { // движение влево
        spaceShip.posX -= spaceShipSpeed;
    }
    if(e.key == "ArrowRight" && spaceShip.posX < 1140) { // движение вправо
        spaceShip.posX += spaceShipSpeed;
    }
    if(e.key == "ArrowUp" && spaceShip.posY > 200) { // вверх
        spaceShip.posY -= spaceShipSpeed;
    }
    if(e.key == "ArrowDown" && spaceShip.posY < 446) { // вниз
        spaceShip.posY += spaceShipSpeed;
        console.log(spaceShip.posY);
    }
});

var numOfAsteroids = 8;
var asteroids = [];

// базовый класс астероида
// var asteroidImg = new Image();
// asteroidImg.src = './img/asteroid.png';
// asteroidImg.ctx = context;
// asteroidImg.posX = 100;
// asteroidImg.posY = 100;
// asteroidImg.speed = 2;
// asteroidImg.draw = (function() {
//     this.ctx.drawImage(this, this.posX, this.posY, 30, 30);
// }).bind(asteroidImg);

// function AsteroidBaseObject(posX, posY, color, radius, speed) {
//     this.posX = posX;
//     this.posY = posY;
//     this.color = color;
//     this.radius = radius;
//     this.speed = speed;

//     this.ctx = context;

//     this.draw = (function() {
//         this.ctx.beginPath();
//         this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, true);
//         this.ctx.closePath();
//         this.ctx.fillStyle = this.color;
//         this.ctx.fill();
//     }).bind(this);

//     this.update = (function() {
//         return setInterval(this.draw, 1);
//     }).bind(this);
// }

// эта функция нужна для генерации случайных чисел
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// тут создаются астероиды разных размеров
function createRandomAsteroid() {
    var asteroidImg = new Image();
    asteroidImg.src = './img/asteroid.png';
    asteroidImg.ctx = context;
    asteroidImg.posX = getRandomValue(5, 1140);
    asteroidImg.posY = -50;
    asteroidImg.size = getRandomValue(10, 60);
    asteroidImg.speed = getRandomValue(2, 8);
    asteroidImg.draw = (function() {
        this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
    }).bind(asteroidImg);

    return asteroidImg;

    // var coordX = getRandomValue(5, 1140);
    // var size = getRandomValue(10, 60);
    // var speed = getRandomValue(2, 8);

    // return new AsteroidBaseObject(coordX, -50, "#a0522d", size, speed);
}

// функция для создания волны астероидов
// function createAsteroidWave() {
//     // numOfAsteroids = getRandomValue(3, 8);
//     for(let i = 0; i < numOfAsteroids; i++) {
//         asteroids.push(createRandomAsteroid());
//     }
// }

// createAsteroidWave();
// asteroid = createRandomAsteroid(); // этот астероид служит датчиком, для определения когда создавать новую волну

var framesNo = 0;
// тут происходит перерисовка канваса и создание волн астероидов
function move() {
    context.clearRect(0,0, canvas.width, canvas.height);
    background.draw();
    // asteroid.draw();
    // asteroidImg.draw();

    framesNo++;
    
    if(!(framesNo % 20)) {
        asteroids.push(createRandomAsteroid());
        
        if(asteroids.length == 21) {
            asteroids.shift();
        }

        framesNo = 0;
    }

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
    }

    spaceShip.draw();

    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].posY += asteroids[i].speed;
    }

    // asteroid.posY += difficultyLevels[2];
    // asteroidImg.posY += asteroidImg.speed;
    // console.log(framesNo++);

    // if(asteroid.posY > canvas.height + 50) {
    //     asteroid = createRandomAsteroid();
    //     createAsteroidWave();
    // }

    window.requestAnimationFrame(move); // анимирем весь процес отрисовки объектов на канвас 
}

window.requestAnimationFrame(move); // анимирем весь процес отрисовки объектов на канвас 