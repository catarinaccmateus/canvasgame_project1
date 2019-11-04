class Game {
    constructor() {
        this.background = new Background(this);
        this.context = this.background.context;
        this.height = this.background.$canvasheight;
        this.width = this.background.$canvasWidth;
        this.player = new Player(this);
        this.player.setControls();
        this.playerWidth = this.player.playerWidth;
        this.obstacleArray = [];
        this.obstacleTime = 0;
        this.frequencyOfObstacle;
        this.score = 0;
        this.animation;
        this.life = 3;
    };


    createObstacles(timestamp) {
        this.frequencyOfObstacle = Math.ceil(Math.random() * 40) * 1000;
        //so the obstacles show in different intervals;

        if (this.obstacleTime < timestamp - this.frequencyOfObstacle) {
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

    checkCollision() {
        if (typeof this.obstacleArray !== 'undefined' && this.obstacleArray.length > 0) {

            let frontOfPlayer = this.player.playerX + this.playerWidth;

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
                    this.score++;
                }
            }
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
        this.player.draw();
        this.updateAndDrawObstacles();

    };

    update() {
        this.background.update();
    };

    clear() {
        this.background.clear();
    }

    animationLoop(timestamp) {
        this.clear();
        this.update();
        this.createObstacles(timestamp);
        this.player.updateImage(timestamp);
        this.drawEverything();
        this.animation = window.requestAnimationFrame(timestamp => this.animationLoop(timestamp));
        this.checkCollision();
    }

}