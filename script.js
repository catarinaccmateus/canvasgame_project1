window.onload = function () {

    document.getElementById('beginner').onclick = function () {
        document.getElementById('game-board').innerHTML = `   <button class="restart" id="restart-beginner">Restart</button> 
        <canvas id = 'canvas' width='900' height='500'></canvas>`;
        beginnerGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
    }

    document.getElementById('intermediate').onclick = function () {
        document.getElementById('game-board').innerHTML = ` <button class="restart" id="restart-intermediate">Restart</button> 
         <canvas id = 'canvas' width='900' height='500'></canvas>`;
        intermediateGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
    }

    document.getElementById('advanced').onclick = function () {
        document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-advanced">Restart</button> 
        <canvas id = 'canvas' width='900' height='500'></canvas>`;
        advancedGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
    }

    document.addEventListener('click', event => {
        switch (event.target.id) {
            case 'restart-beginner':
                document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-advanced">Restart</button> 
                    <canvas id = 'canvas' width='900' height='500'></canvas>`;

                beginnerGame();
                break;

            case 'restart-intermediate':
                document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-advanced">Restart</button> 
                    <canvas id = 'canvas' width='900' height='500'></canvas>`;
                intermediateGame();
                break;
            case 'restart-advanced':
                document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-advanced">Restart</button> 
                        <canvas id = 'canvas' width='900' height='500'></canvas>`;
                advancedGame();
                break;
        }
    });
};

function beginnerGame() {
    let game = new Game(0.2);
    game.start();
};



function intermediateGame() {
    let game = new Game(0.4);
    game.start();
};



function advancedGame() {
    let game = new Game(0.55);
    game.start();
};