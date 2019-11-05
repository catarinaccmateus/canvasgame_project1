class Game {
    constructor() {
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
    };




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

                    cancelAnimationFrame(this.animation);
                } else if (this.player.playerX === this.obstacleArray[i].obstacleX) {
                    //this.score++; --> score will be added everytime he catchs food and not everytime he jumps an obstacle.
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
            cancelAnimationFrame(this.animation);
            this.context.fillStyle = 'white';
            this.context.font = '50px Arial';
            this.context.fillText('He got you!', this.width / 3, this.height / 2)
        }
    }

    checkCollisionHouse() {
        let middleOfPlayer = this.player.playerX + this.playerWidth / 2;
        if (this.house.X <= middleOfPlayer) {
            cancelAnimationFrame(this.animation);
            this.context.fillStyle = 'white';
            this.context.font = '50px Arial';
            this.context.fillText('You arrived home safely!', this.width / 3, this.height / 2)
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
    };



    start() {
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
        this.animation = window.requestAnimationFrame(timestamp => this.animationLoop(timestamp));
        this.checkCollisionObstacles();
        this.checkCollisionEnemy();
        this.checkCollisionHouse();
    };

}