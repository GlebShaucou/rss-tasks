// document.addEventListener("DOMContentLoaded", function() { // начинаем исполнять, когда загрузится страница

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
    var planets = [];
    var framesNo = 0; // переменная для подсчета кадров

    var gameAnimationStart; // переменная для контроля window.requestAnimationFrame(game)
    var startPauseControl; // эта переменная нужна, чтобы предотвратить многократное нажатие пробела и запуск множества window.requestAnimationFrame(game)
    var gameTheme; // переменная для основной музыкальной темы игры
    var crashSound;
    var currentTime; // вкл или выкл музыка

    var lives = document.getElementsByClassName("live"); // жизни корабля
    var livesCount = lives.length; // начальное количество жизней

    var planetImgs = ["./img/jupiter.png", ];

    var gameScore = 0;

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
        spaceship.src = src || "./img/spaceship-normal.png";
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
         
        /* && gameAnimationStart <- эта проверка нужна, чтобы кнопки не нажимались в меню, в этих случаях gameAnimationStart = undefined */
        if(e.key == "ArrowLeft" && spaceship.posX > 10 && gameAnimationStart) { // движение влево
            spaceship.posX -= spaceship.speed;
        }
        if(e.key == "ArrowRight" && spaceship.posX < 1140 && gameAnimationStart) { // движение вправо
            spaceship.posX += spaceship.speed;
        }
        if(e.key == "ArrowUp" && spaceship.posY > 200 && gameAnimationStart) { // вверх
            spaceship.posY -= spaceship.speed;
        }
        if(e.key == "ArrowDown" && spaceship.posY < 446 && gameAnimationStart) { // вниз
            spaceship.posY += spaceship.speed;
        }
        if (e.key == "Escape" && gameAnimationStart) { // остановить игру на паузу
            window.cancelAnimationFrame(gameAnimationStart);
            startControl = gameAnimationStart;

            displayPauseContainer();

            musicControl("pause");
        }
        if (e.key == " " && gameAnimationStart) { // запустить игру
            if (startControl == gameAnimationStart) { // тут мы предотвращаем многократное нажатие пробела 
                gameAnimationStart = window.requestAnimationFrame(game);

                hidePauseContainer();

                musicControl("play");
            }
        }
        if (e.code == "KeyS" && gameAnimationStart) { // on-off music
            musicControl();        
        }
    });

    // базовый класс для музыки
    function Music(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = 0.5;
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
    gameTheme.sound.setAttribute("loop", "loop"); // зацикливаем музыку

    crashSound = new Music("./sounds/crash.mp3"); // инициируем звук столкновения

    // эта функция нужна для генерации случайных чисел
    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // тут создаются планеты-очки
    function createPlanetBonus() {
        let planet = new Image();
        planet.src = "./img/planets.png"; //planetImgs[getRandomValue(1, 9)];
        planet.ctx = context;
        planet.coordX = 7; // позиция на элемент спрайта                     //getRandomValue(5, 1140);
        planet.coordY = 12; // позиция на элемент спрайта
        planet.posX = getRandomValue(5, 1140); // позиция на канвасе
        planet.posY = -50; // позиция на канвасе
        planet.size = 58;
        planet.speed = getRandomValue(5, 10);
        planet.isBonus = true; ////////
        planet.score = 10; //getRandomValue(10, 50);

        planet.draw = (function() {
            this.ctx.drawImage(this, this.coordX, this.coordY, this.size, this.size, this.posX, this.posY, this.size, this.size);
        }).bind(planet);

        planet.clear = (function() {
            this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
        }).bind(planet);

        return planet;
    }

    // тут создаются астероиды разных размеров
    function createRandomAsteroid(src, speed, size) { // базовый класс астероида
        let asteroid = new Image();
        asteroid.src = src || "./img/asteroid.png";
        asteroid.ctx = context;
        asteroid.posX = getRandomValue(5, 1140);
        asteroid.posY = -50;
        asteroid.size = size || getRandomValue(30, 101);
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

            // сюда вставить if (framesNo % 80) cutAsteroidsArr + fallingObjects.push(createPlanetBonus)
            if (framesNo % 100) { // определяем момент появления планет-очков
                cutAsteroidsArr();

                asteroids.push(createPlanetBonus()); // создаем случайную планету и добавляем 
            }

            if (framesNo == 3000) { // астероид монстр

                cutAsteroidsArr(); // ограничиваем массив asteroids   

                asteroids.push(createRandomAsteroid("./img/monster.png", 20));
                framesNo = 0;
            }
        }

        framesNo++;


        for(let i = 0; i < asteroids.length; i++) {
                 
            // события при столкновении с астероидом
            if (detectContact(spaceship, asteroids[i])) {
                if (asteroids[i].isBonus) { // событие при столкновении с планетой, получаем очки
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
                     
                if(livesCount > 1) {
                    lives[livesCount - 1].style.display = "none";
                    livesCount--;

                    if (livesCount == 2) {
                        spaceship.src = "./img/spaceship-light-damage.png";
                    }

                    if (livesCount == 1) {
                        spaceship.src = "./img/spaceship-heavy-damaged.png";
                    }

                    setTimeout(function() {
                        asteroids.splice(i,1);
                        gameAnimationStart = window.requestAnimationFrame(game);
                    }, 300);  
                } else {
                    gameAnimationStart = undefined; // поянения по этому были выше 

                    lives[livesCount - 1].style.display = "none";
                    livesCount--;
                    gameTheme.stop();
                    
                    setTimeout(function() {
                        showEndGameMenu(gameScore);
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
    // function startGame() {
    //     let gameMenu = document.getElementById("game-menu");
    //     gameMenu.style.display = "none";

    //     gameAnimationStart = window.requestAnimationFrame(game); // анимирем весь процес отрисовки объектов на канвас
    //     gameTheme.play();
    // }

    // 
    function showGameMenu() {
        let gameMenu = document.getElementById("game-menu");
        gameMenu.style.display = "block";
    }

    // старт игры и перерисовка
    function startGame() {
        let gameMenu = document.getElementById("game-menu");
        gameMenu.style.display = "none";

        context.clearRect(0,0, canvas.width, canvas.height);

        for(let i = 0; i < lives.length; i++) {
            lives[i].style.display = "inline";
        }
        
        livesCount = lives.length;
        asteroids.length = 0; // это необходимо, чтобы убрать с канваса "старые" астероиды
        background.draw();

        spaceship.posX = 570; 
        spaceship.posY = 350;
        spaceship.src = "./img/spaceship-normal.png";
        spaceship.draw();
        
        gameTheme.play();

        setTimeout(function() {
            gameAnimationStart = window.requestAnimationFrame(game);
        }, 500);
    }

    // показать игровое меню
    function showEndGameMenu(score) {
        let gameEndMenu = document.getElementById("end-game-menu");
        gameEndMenu.style.display = "block";

        let finalScore = document.getElementById("final-score");
        finalScore.textContent = score;
    }

    // действия кнопки ОК в меню окончания игры
    function endGameOkBtn() {
        let gameEndMenu = document.getElementById("end-game-menu");
        gameEndMenu.style.display = "none";
        showGameMenu();
    }

    // показать надпись Pause
    function displayPauseContainer() {
        let pauseContainer = document.getElementById("pause-container");
        pauseContainer.style.display = "block";
    }

    // спрятать надпись Pause 
    function hidePauseContainer() {
        let pauseContainer = document.getElementById("pause-container");
        pauseContainer.style.display = "none";
    }

    // обновить очки
    function setScore(score) {
        let scoreTable = document.getElementById("score");
        scoreTable.textContent = score;
    }

    // console.log(gameTheme);
     
// });