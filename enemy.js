class Enemy {
    constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img.src = "./images/enemy-1.png";
        this.img2 = new Image();
        this.img2.src = "./images/enemy-2.png";
        this.img3 = new Image();
        this.img3.src = "./images/enemy-3.png";
        this.img4 = new Image();
        this.img4.src = "./images/enemy-4.png";
        this.img5 = new Image();
        this.img5.src = "./images/enemy-5.png";
        this.img6 = new Image();
        this.img6.src = "./images/enemy-6.png";
        this.img7 = new Image();
        this.img7.src = "./images/enemy-7.png";
        this.img8 = new Image();
        this.img8.src = "./images/enemy-8.png";
        this.context = this.game.context;
        this.gameHeight = this.game.height;
        this.gameWidth = this.game.width;
        this.height = 180;
        this.width = 80;
        this.distanceFromFloor = 20;
        this.X = -this.width; //the enemy starts outside the canvas
        this.Y = this.gameHeight - this.height - this.distanceFromFloor;
        this.enemyArray = [this.img, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8];
        this.index = 0;
        this.velocity = 0.5;
        this.imageToPrint = this.enemyArray[this.index];
        this.speedImages = 100;
        this.imgTime = 0;
    };

    draw() {
        this.context.drawImage(this.imageToPrint, this.X, this.Y, this.width, this.height)
    };

    updatePosition() {

        if (this.X === 0) {
            this.velocity = Math.abs(this.velocity);
            this.X += this.velocity;

        } else if (this.X < this.gameWidth / 3) {
            this.X += this.velocity;

        } else {
            this.velocity = -Math.abs(this.velocity);
            this.X += this.velocity;
        }
        //This update function allows the enemy to walk front and back.
    };

    updateImage(timestamp) {
        if (this.imgTime < timestamp - this.speedImages) {
            if (this.index >= 7) {
                this.index = 0;
                this.imageToPrint = this.enemyArray[this.index];
            } else {
                this.index++;
                this.imageToPrint = this.enemyArray[this.index];
            };
            this.imgTime = timestamp;
        }
    }

};