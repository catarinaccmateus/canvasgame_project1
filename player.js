class Player {
    constructor(game) {
        this.game = game;
        this.context = game.context;
        this.img = new Image();
        this.img.src = "./images/cat-1.png";
        this.img2 = new Image();
        this.img2.src = "./images/cat-2.png";
        this.img3 = new Image();
        this.img3.src = "./images/cat-3.png";
        this.img4 = new Image();
        this.img4.src = "./images/cat-4.png";
        this.playerWidth = 80;
        this.playerHeight = 80;
        this.playerY = 400;
        this.playerX = this.playerWidth*2;
        this.playerJumping = true;
        this.velocityX = 0;
        this.velocityY = 5;
        this.gravity = 5;
        this.speedX = 5;
        this.arrayOfImages = [this.img, this.img2, this.img3, this.img4];
        this.test = 0;
        this.playerTime = 0;
        this.speed = 100;
        this.imageToPrint = this.arrayOfImages[this.test];
    }

    draw() {
        if (this.playerY < 400) {
            this.imageToPrint = this.img2
        }
        //everytime the player is not at the floor, is with the jumping image.

        this.context.drawImage(
            this.imageToPrint,
            this.playerX,
            this.playerY,
            this.playerWidth,
            this.playerHeight
        );
    }

    updateImage(a) {

        if (this.playerTime < a - this.speed) {
            if (this.test >= 3) {
                this.test = 0;
                this.imageToPrint = this.arrayOfImages[this.test];
                //need to re-define again imageToPrint due to the new index;
            } else {
                this.test++;
                this.imageToPrint = this.arrayOfImages[this.test];
                //need to re-define again imageToPrint due to the new index;
            };

            this.playerTime = a;
        }

    };

    moveRight() {
        if (this.playerX === 780) {
            //adding right border
            this.playerX = 780;
        } else {
            this.playerX += this.speedX;
        }
    }
    //Above I define my right border has 780.



    moveLeft() {
        if (this.playerX === -20) {
            this.playerX === -20;
        } else {
            this.playerX -= this.speedX;
        }
    }
    //Above I define my left border has -20.

    jump() {
        if (this.playerY === 400) {
            this.playerY = 400 - this.playerHeight;
        } else if (this.playerY < 400) {
            this.playerY += this.gravity;
        }
    }

    goDown() {
        this.playerY = 400;
        this.imageToPrint = this.img;
    }

    setControls() {
        window.addEventListener(
            "keydown",
            function (e) {
                if ([38].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            },
            false
        );

        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 39: //right key
                    this.moveRight();
                    break;
                case 37: //left key
                    this.moveLeft();
                    break;
                case 38: //up key
                    this.jump();
                    break;
            }
        });

        window.addEventListener("keyup", event => {
            event.preventDefault();
            switch (event.keyCode) {
                case 38: //up key
                    this.goDown();
                    break;
            }
        });
    }
}