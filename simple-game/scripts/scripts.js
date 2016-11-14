document.addEventListener("DOMContentLoaded", universeGunman); // начинаем исполнять, когда загрузится страница

function universeGunman() {
    var canvas = document.getElementById("game-area");
    var context = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var background = new Image(); // задний план - космос

    var spaceship = createSpaceship();

    var difficultyMinLevel = 2; // сложность игры, это нижний порог скорости астероидов, чем выше значение, тем быстрее будут все астероиды
    var difficultyMaxLevel = 8;
    var frequencyAsteroids = 30; // частота кадров для появления новых астероидов
    var asteroids = [];
    var framesNo = 0; // переменная для подсчета кадров

    var gameAnimationStart; // переменная для контроля window.requestAnimationFrame(game)
    var startPauseControl; // эта переменная нужна, чтобы предотвратить многократное нажатие пробела и запуск множества window.requestAnimationFrame(game)
    var gameTheme; // переменная для основной музыкальной темы игры
    var crashSound;
    var currentTime; // вкл или выкл музыка

    var lives = document.getElementsByClassName("live"); // жизни корабля
    var livesCount = lives.length; // начальное количество жизней

    // задний план - космос
    background.src = "./img/bg.png";
    background.posX = 0;
    background.posY = 0;
    background.dy = 1;
    background.ctx = context;    
    background.draw = (function() { // рисуем задний план и приводим его в движение    
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight); 

        this.ctx.drawImage(this, this.posX, this.posY, canvasWidth, canvasHeight);
        this.ctx.drawImage(this, this.posX, this.posY - canvasHeight, canvasWidth, canvasHeight);

        if (this.posY > canvasHeight) {
            this.posY = 0;
        }
        
        this.posY += this.dy;
    }).bind(background);

    // базовая модель корабля
    function createSpaceship(src) {
        var spaceship = new Image(); // базовая модель корабля
        spaceship.src = src || "./img/spaceship.png";
        spaceship.ctx = context;
        spaceship.posX = 570; 
        spaceship.posY = 350;
        spaceship.speed = 5;
        spaceship.width = 75;
        spaceship.height = 120;
        spaceship.draw = (function() {
            this.ctx.drawImage(this, this.posX, this.posY, this.width, this.height);

        }).bind(spaceship);

        return spaceship;
    }

    // обрабатываем нажатие кнопок на клавиатуре
    window.addEventListener("keydown", function(e) {
        e.preventDefault();
        console.log(e);    
        if(e.key == "ArrowLeft" && spaceship.posX > 10) { // движение влево
            spaceship.posX -= spaceship.speed;
        }
        if(e.key == "ArrowRight" && spaceship.posX < 1140) { // движение вправо
            spaceship.posX += spaceship.speed;
        }
        if(e.key == "ArrowUp" && spaceship.posY > 200) { // вверх
            spaceship.posY -= spaceship.speed;
        }
        if(e.key == "ArrowDown" && spaceship.posY < 446) { // вниз
            spaceship.posY += spaceship.speed;
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
        if (e.code == "KeyS") { // on/off music
            musicControl();        
        }
    });

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

    gameTheme = new Music("./sounds/Blazing-Stars-short.mp3"); // инициируем фоновую музыку
    // gameTheme.sound.setAttribute("autoplay", "autoplay");
    gameTheme.sound.setAttribute("loop", "loop");

    crashSound = new Music("./sounds/crash.mp3"); // инициируем звук столкновения

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

        asteroid.clear = (function() { // этот метод нужен для удаления астероидов при столкновении
            this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
        }).bind(asteroid);

        return asteroid;
    }

    // создаем взрыв
    function createExplosion(posX, posY, size) {
        let explosion = new Image();
        explosion.src = "./img/astr_explosion.png";
        explosion.posX = posX;
        explosion.posY = posY;
        explosion.size = size;
        explosion.ctx = context;

        explosion.draw = (function() {
            this.ctx.drawImage(this, this.posX, this.posY, this.size, this.size);
        }).bind(explosion);

        explosion.clear = (function() { 
            this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
        }).bind(explosion);

        return explosion;
    }

    // это функция нужна, чтобы ограничить массив asteroids
    function cutAsteroidsArr() { 
        if(asteroids.length > 30) {
            asteroids.shift();
        }
    }

    // функция определяет было ли столкновения
    function detectContact(ship, astr) {
        if(ship.posX < astr.posX + astr.size && ship.posX + ship.width > astr.posX && ship.posY < astr.posY + astr.size && ship.posY + ship.height > astr.posY) {
            return true;
        }
        return false;
    }

    // тут происходит перерисовка канваса и создание всех объектов
    function game() {
        gameAnimationStart =  window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас

        background.draw();
        
        if(!(framesNo % frequencyAsteroids)) {
            cutAsteroidsArr(); // ограничиваем массив asteroids

            asteroids.push(createRandomAsteroid());

            if (framesNo == 1000) { // астероид монстр

                cutAsteroidsArr(); // ограничиваем массив asteroids   

                asteroids.push(createRandomAsteroid("./img/monster.png", 20));
                framesNo = 0;
            }
        }

        framesNo++;

        for(let i = 0; i < asteroids.length; i++) {
                 
            // события при столкновении с астероидом
            if (detectContact(spaceship, asteroids[i])) {

                var expl = createExplosion(asteroids[i].posX, asteroids[i].posY, asteroids[i].size, asteroids[i].size);

                crashSound.play(); 
                expl.draw();

                window.cancelAnimationFrame(gameAnimationStart);
                startControl = gameAnimationStart;
                     
                if(livesCount > 1) {
                    lives[livesCount - 1].style.display = "none";
                    livesCount--;

                    setTimeout(function() {
                        asteroids.splice(i,1);
                        gameAnimationStart = window.requestAnimationFrame(game);
                    }, 300);  
                } else {
                    lives[livesCount - 1].style.display = "none";
                    livesCount--;
                    gameTheme.stop();
                    
                    setTimeout(function() {
                        alert("Game Over!");
                    }, 50);
                }                     
            } else {
                 asteroids[i].draw(); // рисуем астероиды на canvas
            }
        }

        spaceship.draw(); // рисуем космический корабль на canvas

        for(let i = 0; i < asteroids.length; i++) { // двигаем астероиды
            asteroids[i].posY += asteroids[i].speed;
        } 
    }

    // запускаем игру
    function startGame() {
        gameAnimationStart = window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас
        gameTheme.play();
    }

    // рестарт игры и перерисовка
    function restartGame() { 
        context.clearRect(0,0, canvas.width, canvas.height);

        for(let i = 0; i < lives.length; i++) {
            lives[i].style.display = "inline";
        }
        
        livesCount = lives.length;
        asteroids.length = 0; // это необходимо, чтобы убрать с канваса "старые" астероиды
        background.draw();
        spaceship.draw();
        gameTheme.play();

        setTimeout(function() {
            gameAnimationStart = window.requestAnimationFrame(game);
        }, 500);
    } 
}