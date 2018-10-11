(function() {
    'use strict';

    var Animated = {
        init: function(settings) {
            this.setConfigurations(settings);
            this.startListeners();
        },
        setConfigurations: function(settings) {
            this.intervalLevels = settings.intervalLevels;
            this.image = document.querySelector('.animation__image');
            this.gameOverImage = document.querySelector('.animation__game-over-image');
            this.gameWinnerImage = document.querySelector('.animation__game-winner-image');
            this.levelNumberWrapper = document.querySelector('.animation__level-number');
            this.messageWrapper = document.querySelector('.animation__message');
            this.gameOverMessage = 'Celebi escapou!';
            this.gameWinnerMessage = 'Parabéns, você capturou Celebi!';
            this.timerWrapper = document.querySelector('.animation__timer');
            this.timerValue = settings.timer;
            this.timer = this.timerValue;
            this.imageHeight = this.image.offsetHeight;
            this.imageWidth = this.image.offsetWidth;
            this.initialLevel = 1;
            this.currentLevel = this.initialLevel;
            this.animateInterval = null;
            this.counter = null;
            this.startedGame = false;

            this.startButton = document.querySelector('.animation__button');

            this.setWrapperSize();
            this.showAndCentralizeImage(this.image);
        },
        startListeners: function() {
            window.addEventListener('resize', this.setWrapperSize.bind(this), false);
            this.image.addEventListener('click', this.stopAnimate.bind(this), false);
            this.startButton.addEventListener('click', this.startGame.bind(this), false);
        },
        startGame: function() {
            if (this.startedGame) {
                this.restartGame();
            }

            this.startedGame = true;
            this.startTimer();
            this.startAnimate(this.initialLevel);
            this.startButton.innerHTML = 'Reiniciar Jogo';
        },
        restartGame: function() {
            clearInterval(this.animateInterval);
            clearInterval(this.counter);
            this.showAndCentralizeImage(this.image);
            this.hideElement(this.gameOverImage);
            this.hideElement(this.gameWinnerImage);
            this.messageWrapper.innerHTML = '';
            this.currentLevel = this.initialLevel;
        },
        startTimer: function() {
            this.timerWrapper.innerHTML = this.timerValue
            this.timer = this.timerValue;

            this.counter = setInterval(this.decrementCounter.bind(this), 1000);
        },
        decrementCounter: function() {
            this.timer--;
            this.timerWrapper.innerHTML = this.timer;

            if (this.timer === 0) {
                this.gameOver();
            }
        },
        gameOver: function() {
            this.showEndGameStatus(this.gameOverImage, this.gameOverMessage);
        },
        gameWinner: function() {
            this.showEndGameStatus(this.gameWinnerImage, this.gameWinnerMessage);
        },
        showEndGameStatus: function(image, message) {
            clearInterval(this.counter);
            clearInterval(this.animateInterval);
            this.showStatusMessage(message);
            this.hideElement(this.image);

            this.showAndCentralizeImage(image);
        },
        showStatusMessage: function(message) {
            this.messageWrapper.innerHTML = message;
        },
        setWrapperSize: function() {
            this.wrapperHeight = window.innerHeight;
            this.wrapperWidth = window.innerWidth;
        },
        startAnimate: function(level) {
            this.levelNumberWrapper.innerHTML = this.currentLevel;
            this.animateInterval = setInterval(this.animate.bind(this), this.intervalLevels[level]);
        },
        stopAnimate: function() {
            var nextLevel = this.currentLevel + 1,
                levelValue = this.intervalLevels[nextLevel];
            
            if (!this.startedGame) {
                return;
            }

            clearInterval(this.animateInterval);

            if (levelValue) {
                this.currentLevel = nextLevel;
                this.startAnimate(this.currentLevel);
            } else {
                this.gameWinner();
            }
        },
        animate: function() {
            this.image.style.top = this.generatePositionValue(this.wrapperHeight - this.imageHeight);
            this.image.style.left = this.generatePositionValue(this.wrapperWidth - this.imageWidth);
            this.image.style.marginTop = '0px';
            this.image.style.marginLeft = '0px';
        },
        showAndCentralizeImage: function(image) {
            var imageHeight = null,
                imageWidth = null;
            
            image.style.display = 'block';

            imageHeight = image.offsetHeight;
            imageWidth = image.offsetWidth;

            image.style.top = '50%';
            image.style.marginTop = '-' + (imageHeight - (imageHeight / 2)) + 'px';
            image.style.left = '50%';
            image.style.marginLeft = '-' + (imageWidth - (imageWidth / 2)) + 'px';
        },
        generatePositionValue: function(baseNumber) {
            var value = null;

            while (value === null || value > baseNumber) {
                value = this.getRandomValue(baseNumber);
            }

            return value + 'px';
        },
        getRandomValue: function(baseNumber) {
            return Math.ceil(Math.random() * baseNumber);
        },
        hideElement: function(element) {
            element.style.display = 'none';
        },
        showElement: function(element) {
            element.style.display = 'block';
        }
    };

    window.onload = function() {
        Animated.init({
            intervalLevels: {
                1: 2000,
                2: 1000,
                3: 500,
                4: 200,
                5: 100
            },
            timer: 30
        });
    };
}());