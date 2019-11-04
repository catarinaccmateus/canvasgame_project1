class Game {
    constructor() {
        this.background = new Background(this);
        this.context = this.background.context;
        this.height = this.background.$canvasheight;
        this.width = this.background.$canvasWidth;
        this.player = new Player(this);
        this.player.setControls();
        this.obstacleArray = [];
        this.obstacleTime = 0;
        this.frequencyOfObstacle = 2000;
        this.animation;
    }

    createObstacles(timestamp) {
        if (this.obstacleTime < timestamp - this.frequencyOfObstacle) {
            const obstacle = new Obstacles(this);
            this.obstacleArray.push(obstacle);
            this.obstacleTime = timestamp;
        }
    };

    updateAndDrawObstacles() {
        for (let i = 0; i < this.obstacleArray.length; i++) {
            this.obstacleArray[i].draw();
            this.obstacleArray[i].update();
        }
    };

    start() {
        this.animationLoop();
    };

    drawEverything() {
        this.background.draw();
        this.player.draw();
        this.updateAndDrawObstacles
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
        this.drawEverything();
        this.updateAndDrawObstacles();
        this.animation = window.requestAnimationFrame(timestamp => this.animationLoop(timestamp));
    }

}