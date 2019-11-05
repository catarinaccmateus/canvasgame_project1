class House {
    constructor(game) {
        this.game = game;
        this.context = this.game.context;
        this.img = new Image();
        this.img.src = './images/cat-house.png';
        this.width = 80;
        this.height = 80;
        this.X = this.game.width * 2;
        //The house is created outside the canvas, so it shows isolated at the end.
        this.distanceFromFloor = 20;
        this.Y = this.game.height - this.height - this.distanceFromFloor;
    };

    draw() {
        if (this.game.obstacleArray.length >= this.game.numberOfObstaclesPerGame) {
            this.update();
            this.context.drawImage(this.img, this.X, this.Y, this.width, this.height);
        }
    };

    update() {
        this.X -= 5;
    };

}