class Player {
    constructor(game) {
        this.game = game;
        this.context = game.context;
        this.img = new Image();
        this.img.src = './images/aa-remove2.png';
        this.playerY = 370;
        this.playerX = 0;
        this.playerJumping = true;
        this.velocityX = 0;
        this.velocityY = 5;
        this.speedX = 5;
    }

    draw() {
        this.context.drawImage(this.img, 0, 0, this.img.width / 4, this.img.height / 2, this.playerX, this.playerY, 120, 120);
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
    
        this.playerY = 270;
    }

    goDown() {
        this.playerY = 370;
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