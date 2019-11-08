class Game {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.background = new Background(this);
        this.context = this.background.context;
        this.height = this.background.$canvasheight;
        this.width = this.background.$canvasWidth;
        this.player = new Player(this);
        this.player.setControls();
        this.enemy = new Enemy(this);
        this.food = new Food(this);
        this.playerWidth = this.player.playerWidth;
        this.obstacleArray = [];
        this.obstacleTime = 0;
        this.frequencyOfObstacle;
        this.foodArray = [];
        this.foodTime = 0;
        this.foodFrequency = 500;
        this.score = 0;
        this.foodCatched = 0;
        this.animation;
        this.life = 3;
        this.numberOfObstaclesPerGame = 10;
        this.house = new House(this);
        this.imgHeart = new Image();
        this.imgHeart.src = './images/heart-life.png'
        this.lost = false;
        this.music_game = document.createElement('audio');
        this.music_game.src = './audio/background-game-music.mp3';
        this.sound_collision_enemy = document.createElement('audio');
        this.sound_collision_enemy.src = './audio/caught-by-enemy.mp3';
        this.sound_collision_obstacle = document.createElement('audio');
        this.sound_collision_obstacle.src = './audio/goint-into-bin-cut.mp3';
        this.sound_arriving_home = document.createElement('audio');
        this.sound_arriving_home.src = './audio/got-to-house.mp3';
    }

    gameReset() {
        this.difficulty = difficulty;
        this.game.clear();
        this.obstacleArray = [];
        this.obstacleTime = 0;
        this.foodArray = [];
        this.foodTime = 0;
        this.life = 3;
        this.score = 0;
        this.foodCatched = 0;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.lost = false;
    }

    createObstacles(timestamp) {
        this.frequencyOfObstacle = Math.ceil(Math.random() * 40) * 1000;
        //so the obstacles show in different intervals;

        if (this.obstacleTime < timestamp - this.frequencyOfObstacle && this.obstacleArray.length < this.numberOfObstaclesPerGame) {
            const obstacle = new Obstacles(this);
            this.obstacleArray.push(obstacle);
            this.obstacleTime = timestamp;
        };
    };



    updateAndDrawObstacles() {
        for (let i = 0; i < this.obstacleArray.length; i++) {
            this.obstacleArray[i].draw();
            this.obstacleArray[i].update();
        }
    };


    restartButton() {
        document.addEventListener('click', event => {

            switch (event.target.id) {

                case 'restart-beginner':
                    this.lost = true;
                    this.sound_collision_enemy.pause();
                    this.sound_collision_enemy.currentTime = 0;
                    this.sound_collision_obstacle.pause();
                    this.sound_collision_obstacle.currentTime = 0;
                    this.player.jump_sound.pause();
                    this.player.jump_sound.currentTime = 0;
                    this.music_game.pause();
                    this.music_game.currentTime = 0;
                    break;
                case 'restart-intermediate':
                    this.lost = true;
                    this.sound_collision_enemy.pause();
                    this.sound_collision_enemy.currentTime = 0;
                    this.sound_collision_obstacle.pause();
                    this.sound_collision_obstacle.currentTime = 0;
                    this.player.jump_sound.pause();
                    this.player.jump_sound.currentTime = 0;
                    this.music_game.pause();
                    this.music_game.currentTime = 0;
                    break;
                case 'restart-advanced':
                    this.lost = true;
                    this.sound_collision_enemy.pause();
                    this.sound_collision_enemy.currentTime = 0;
                    this.sound_collision_obstacle.pause();
                    this.sound_collision_obstacle.currentTime = 0;
                    this.player.jump_sound.pause();
                    this.player.jump_sound.currentTime = 0;
                    this.music_game.pause();
                    this.music_game.currentTime = 0;
                    break;
            }
        })
    };


    checkCollisionObstacles() {
        if (typeof this.obstacleArray !== 'undefined' && this.obstacleArray.length > 0) {

            let frontOfPlayer = this.player.playerX + this.playerWidth;
            //need to calculate the fron of player in each iteration since his X changes with the movement.

            for (let i = 0; i < this.obstacleArray.length; i++) {
                if (this.player.playerY === 400 &&
                    frontOfPlayer > this.obstacleArray[i].obstacleX + 5 &&
                    frontOfPlayer <= this.obstacleArray[i].obstacleX + 80
                    //5 is the closest I want my player to get near the trash bin
                    //80 is the obstacle width
                    ||
                    this.player.playerY === 400 &&
                    this.player.playerX >= this.obstacleArray[i].obstacleX &&
                    this.player.playerX <= this.obstacleArray[i].obstacleX + 55
                    //obstacle width is 80, but only declaring 55 since I want the cat's tail to be able to touch the trash bin.
                ) {
                    if (this.life > 0) {

                        this.obstacleArray[i].obstacleX -= 135
                        //The object will go back 135px --> 80 that is the character width + 55 since it's the caudal limit we gave in the condition above.
                        this.life--;
                        this.score -= 5;
                        this.sound_collision_obstacle.pause();
                        this.sound_collision_obstacle.currentTime = 0;
                        //so if it reaches to another obstacles to quickly, both will make sounds.
                        this.sound_collision_obstacle.play();
                    } else {
                        this.context.fillStyle = 'white';
                        this.context.font = 'italic 45px Arial';
                        this.context.fillText('You got hurt and he caught you!', this.width / 4, this.height / 2);
                        this.sound_collision_enemy.play();
                        this.lost = true;
                    }
                }
            }
        }
    };



    checkCollisionFood() {
        if (typeof this.foodArray !== 'undefined' && this.foodArray.length > 0) {

            let frontOfPlayer = this.player.playerX + this.playerWidth;

            for (let i = 0; i < this.foodArray.length; i++) {
                if (this.player.playerY <= 380 &&
                    //needs to be at least 20px outside the floor to catch the food (playerX on the floor (400) - 20);
                    frontOfPlayer >= this.foodArray[i].foodX &&
                    frontOfPlayer <= this.foodArray[i].foodX + this.foodArray[i].imagesWidth
                    //the player head needs to be between the beginning and end of food.
                ) {
                    this.score += this.foodArray[i].points;
                    this.foodArray.splice(i, 1);
                    //will add the specific food points to the score
                }
            }
        }
    };


    checkCollisionEnemy() {
        if (this.player.playerX < this.enemy.X) {
            this.lost = true;
            this.context.fillStyle = 'white';
            this.context.font = '50px Arial';
            this.context.fillText('He got you!', this.width / 3, this.height / 2);
            this.music_game.pause();
            this.music_game.currentTime = 0;
            this.sound_collision_enemy.play();
        }
    }

    checkCollisionHouse() {
        let middleOfPlayer = this.player.playerX + this.playerWidth / 2;
        if (this.house.X <= middleOfPlayer) {
            cancelAnimationFrame(this.animation);
            this.context.fillStyle = 'white';
            this.context.font = '50px Arial';
            this.context.fillText('You arrived home safely!', this.width / 3, this.height / 2);
            document.getElementById('score_list').innerHTML += `<li> ${this.score} </li>`;
            this.music_game.pause();
            this.music_game.currentTime = 0;
            this.sound_arriving_home.play();
        };
    };



    createFood(timestamp) {
        if (this.foodTime < timestamp - this.foodFrequency && this.obstacleArray.length < this.numberOfObstaclesPerGame) {
            const food = new Food(this);
            food.createDifferentFood();
            //so each food that is created has a different image;
            this.foodArray.push(food);
            this.foodTime = timestamp;
        }
    };



    updatAndDrawFood() {
        for (let i = 0; i < this.foodArray.length; i++) {
            this.foodArray[i].draw();
            this.foodArray[i].update();
        }
    };



    drawScore() {
        this.context.fillStyle = 'white';
        this.context.font = 'italic 30px Arial';
        this.context.fillText(`Your score: ${this.score}`, 10, 50);
        if (this.life === 3) {
            this.context.fillText('Your lifes: ', 570, 50);
            this.context.drawImage(this.imgHeart, 720, 20, 40, 40);
            this.context.drawImage(this.imgHeart, 770, 20, 40, 40);
            this.context.drawImage(this.imgHeart, 820, 20, 40, 40);
        } else if (this.life === 2) {
            this.context.fillText('Your lifes: ', 570, 50);
            this.context.drawImage(this.imgHeart, 720, 20, 40, 40);
            this.context.drawImage(this.imgHeart, 770, 20, 40, 40);
        } else if (this.life === 1) {
            this.context.fillText('Your lifes: ', 570, 50);
            this.context.drawImage(this.imgHeart, 720, 20, 40, 40);
        } else if (this.life < 1) {
            this.context.fillText('Your lifes: ', 570, 50);
        }
    };


    loose() {
        if (this.lost === true) {
            cancelAnimationFrame(this.animation);
            this.music_game.pause();
            this.music_game.currentTime = 0;
        };
    };


    start() {
        this.music_game.play();
        this.animationLoop();
    };



    drawEverything() {

        this.background.draw();
        this.drawScore();
        this.house.draw();
        this.player.draw();
        this.enemy.draw();
        this.updateAndDrawObstacles();
        this.updatAndDrawFood();
    };



    update() {
        this.background.update();
        this.enemy.updatePosition();
    };



    clear() {
        this.background.clear();
    };



    animationLoop(timestamp) {

        this.clear();
        this.update();
        this.createObstacles(timestamp);
        this.createFood(timestamp);
        this.player.updateImage(timestamp);
        this.enemy.updateImage(timestamp);
        this.drawEverything();
        this.checkCollisionFood();
        this.restartButton();
        this.animation = window.requestAnimationFrame(timestamp => this.animationLoop(timestamp));
        this.checkCollisionObstacles();
        this.checkCollisionEnemy();
        this.checkCollisionHouse();
        this.loose();
    };

}