class Player {
    constructor(game) {
        this.game = game;
        this.context = game.context;
        this.img = new Image();
        this.img.src = './images/cat-1.png';
        this.img2 = new Image();
        this.img.src = './images/cat-2.png';
        this.img3 = new Image();
        this.img.src = './images/cat-3.png';
        this.img4 = new Image();
        this.img.src = './images/cat-4.png';
        this.playerWidth = 80;
        this.playerHeight = 80;
        this.playerY = 400;
        this.playerX = 0;
        this.playerJumping = true;
        this.velocityX = 0;
        this.velocityY = 5;
        this.speedX = 5;
        this.arrayOfImages = [this.img, this.img2, this.img3, this.img4];
    }

    draw() {
        this.context.drawImage(this.img, this.playerX, this.playerY, this.playerWidth, this.playerHeight);
    };

    moveRight() {
        if (this.playerX === 780) {  //adding right border
            this.playerX = 780;
        } else {
            this.playerX += this.speedX;

        }
    };

    moveLeft() {
        if (this.playerX === -20) {
            this.playerX === -20
        } else {
            this.playerX -= this.speedX;
        }

    };

    jump() {
    
        this.playerY = 400 - this.playerHeight;
    }

    goDown() {
        this.playerY = 400;
    }

    setControls() {

        window.addEventListener('keydown', function (e) {
            if ([38].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

        window.addEventListener('keydown', event => {
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

        window.addEventListener('keyup', (event) => {
            event.preventDefault();
            switch (event.keyCode) {
                case 38: //up key
                    this.goDown();
                    break;
            }
        });
    };

}