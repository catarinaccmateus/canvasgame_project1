class Background {
    constructor(game) {
        this.game = game;
        this.$canvas = document.getElementById('canvas');
        this.$canvasWidth = this.$canvas.width;
        this.$canvasheight = this.$canvas.clientHeight;
        this.context = this.$canvas.getContext('2d');
        this.img = new Image();
        this.img.src = './images/night-background.png';
        this.imgHeight = this.$canvasheight;
        this.imgWidth = this.$canvasWidth + 5;
        this.x = 0;
        this.speed = -2;
    }
    draw() {
    
        this.context.drawImage(this.img, this.x, 0, this.imgWidth, this.imgHeight);
    };

    update() {
        this.x += this.speed;
        this.x %= this.$canvasWidth;
        if (this.speed < 0) {
            this.context.drawImage(this.img, this.x + this.$canvasWidth, 0, this.imgWidth, this.imgHeight);
        } else {
            this.context.drawImage(this.img, this.x - this.$canvasWidth, 0, this.imgWidth, this.imgHeight)
        }
    };

    clear() {
        this.context.clearRect(0, 0, this.$canvasWidth, this.$canvasheight);
    }

}
