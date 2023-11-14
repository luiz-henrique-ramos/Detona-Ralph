const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        numbers: document.querySelectorAll(".number"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#lives"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 15,
        lifeCount: 3,
        totalScore: 0,
        topScore: [0, 0, 0, 0, 0],
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        lifeCountDownTimerId: null,
    }
};

function topScore(value) {
    let minValue = Math.min(...state.values.topScore);

    if (value >= minValue) {
        let minIndex = state.values.topScore.indexOf(minValue);
        state.values.topScore.splice(minIndex, 1);
        state.values.topScore.push(value);
        state.values.topScore.sort((a, b) => b - a);

        state.view.numbers.forEach((element, index) => {
            element.textContent = state.values.topScore[index];
        });
    }
}


function countDown(){    
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        state.values.totalScore += state.values.result;
        lifeCountDown();
    }
}

function lifeCountDown() {
    state.values.lifeCount--;
    state.view.life.textContent = state.values.lifeCount;

    if (state.values.lifeCount === 0) {
        topScore(state.values.totalScore);
        alert("Sua pontuação total é: " + state.values.totalScore);
        state.values.lifeCount = 3;
        state.view.life.textContent = state.values.lifeCount;
        state.values.totalScore = 0;
        resetGame();
    }
    else{
        resetGame();
    }
}

function resetGame() {
    state.values.currentTime = 10;
    state.view.timeLeft.textContent = state.values.currentTime;

    state.values.result = 0;
    state.view.score.textContent = state.values.result;
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); 
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        } )
    }
    )
}

function init(){
    moveEnemy();
    addListenerHitbox();
    countDown();
}

init();