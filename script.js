let sound_button = document.createElement('audio');
sound_button.src = './audio/press-button.mp3';
sound_button.setAttribute("preload", "auto");

let music_background = document.createElement('audio');
music_background.src = './audio/music-menu-entrance.mp3'

window.onload = function () {

    document.getElementById('link_start').onclick = function () {
        music_background.play();
    };


    document.getElementById('beginner').onclick = function () {

        music_background.pause();
        sound_button.play();
        document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-beginner">Restart</button>  
        <canvas id = 'canvas' width='900' height='500'></canvas>`;
        beginnerGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
        //The score list is an html element that was with no-display. Will be desplayed when canvas is started.
    }

    document.getElementById('intermediate').onclick = function () {

        music_background.pause();
        sound_button.play();
        document.getElementById('game-board').innerHTML = ` <button class="restart" id="restart-intermediate">Restart</button> 
         <canvas id = 'canvas' width='900' height='500'></canvas>`;
        intermediateGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
    }

    document.getElementById('advanced').onclick = function () {

        music_background.pause();
        sound_button.play();
        document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-advanced">Restart</button> 
        <canvas id = 'canvas' width='900' height='500'></canvas>`;
        advancedGame();
        const element = document.getElementById("score");
        element.classList.remove("no_display");
    }

    document.addEventListener('click', event => {

        switch (event.target.id) {

            case 'restart-beginner':
                sound_button.play();
                document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-beginner">Restart</button> 
                    <canvas id = 'canvas' width='900' height='500'></canvas>`;
                beginnerGame();
                break;

            case 'restart-intermediate':
                sound_button.play();
                document.getElementById('game-board').innerHTML = `  <button class="restart" id="restart-intermediate">Restart</button> 
                    <canvas id = 'canvas' width='900' height='500'></canvas>`;
                intermediateGame();
                break;

            case 'restart-advanced':
                sound_button.play();
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