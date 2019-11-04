class Obstacles {
    constructor(game) {
        this.game = game;
        this.context = this.game.context;
        this.img = new Image();
        this.img.src = './images/trash-remove.png';
        this.img.height = 50;
        this.img.width = 50;
        this.distanceFromFloor = 20;
        this.obstacleX = this.game.width; //so obstacles start outside the canvas
        this.obstacleY = this.game.height - this.img.height;
        this.speed = -2;
    }

    draw() {
        this.context.drawImage(this.img, this.obstacleX, this.obstacleY - this.distanceFromFloor, this.img.width,  this.img.height)
    }

    update() {
        this.obstacleX += this.speed;
    }

}