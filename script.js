window.onload = function () {
   this.document.getElementById('start-button').onclick = function () {
       document.getElementById('game-board').innerHTML = `   <canvas id = 'canvas' width='900' height='500'></canvas>`;
       const game = new Game();
       game.start();
   }
}