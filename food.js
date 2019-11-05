class Food {
    constructor(game) {
        this.game = game;
        this.context = this.game.context;
        this.gameWidth = this.game.width;
        this.gameHeight = this.game.height;
        this.chicken = new Image();
        this.chicken.src = './images/chicken-food.png';
        this.nuggets = new Image();
        this.nuggets.src = './images/nuggets-food.png';
        this.pizza = new Image();
        this.pizza.src = './images/pizza-food.png';
        this.hamburger = new Image();
        this.hamburger.src = './images/hamburger-food.png';
        this.imagesWidth = 50;
        this.imagesHeight = 50;
        this.foodX = this.gameWidth;
        //the food starts outside the canvas, in the game width X.
        this.foodY = 340;
        //the food height is slightly bigger than playersY when jumping (playerY when jumping is 320), so the food is slightly below him.
        this.foodArray = [this.chicken, this.hamburger, this.nuggets, this.pizza,];
        this.index = 0;
        this.imageToPrint = this.foodArray[this.index];
        this.speed = -5;
        this.points = 1;

    }

    draw() {
        this.context.drawImage(this.foodArray[this.index], this.foodX, this.foodY, this.imagesWidth, this.imagesHeight);
    };

    update() {
        this.foodX -= 5;
    };

    createDifferentFood() {
        this.index = Math.floor(Math.random() * 4);
        //selects one index of the array of food images
        switch (this.index) {
            case 0:
                this.points = 4;
                break;
            case 1:
                this.points = 3;
                break;
            case 2:
                this.points = 2;
                break;
            case 3:
                this.points = 1;
                break;
        }
        //gives a specific point depending on the index image;
    }

}