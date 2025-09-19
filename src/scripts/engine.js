const state ={
    //Alterar vamores visuais
    view:{
        squares: document.querySelectorAll(".square"),
        enenmy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector('#live')
    },
    //Alterar valores internos
    values:{
        // poderia ser também
        // timerId: setInterval(randomSquare, 1000) no actions
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        live: 3
    },
    //Execultam ações
    actions:{
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime
    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result)
    }
}

function countLives(allPoints){
    allPoints += state.values.result
    state.values.live--
    state.view.live.textContent = state.values.live
    if (live <= 0) {
        alert("Game Over! Acabaram suas vidas! O seu resultado foi: " + allPoints)
        allPoints = 0;
    }
}

function randomSquare(){
    // Limpando caso haja um enemy em algum quadrado
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    // Sorteia um número aleatorio até 9
    let randomNumber = Math.floor(Math.random() * 9)
    // Pega o quadrado referente ao número
    let randomSquare = state.view.squares[randomNumber]
    // Coloca o inimigo no quadrado sorteado
    randomSquare.classList.add("enemy")
    //Salva o número aleatório do quadrado sorteado
    state.values.hitPosition = randomSquare.id

}

function moveEnemy(){
    // A cada x tempo vai chamar a função random square
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state. values.result;
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    })
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();