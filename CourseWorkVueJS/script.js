let start = document.querySelector('#start')
let game = document.querySelector('#game')
let time = document.querySelector('#time')
time.textContent = 5
let result = document.querySelector('#result')
let timeHeader = document.querySelector('#time-header')
let resultHeader = document.querySelector('#result-header')

start.addEventListener('click', startGame)
game.addEventListener('click', handleBoxClick)


function startGame() {
    score = 0
    setGameTime()
    timeHeader.classList.remove('hide') 
    resultHeader.classList.add('hide')
    isGameStarted = true
    game.style.backgroundColor = '#fff'
    start.classList.add('hide')

    const interval = setInterval(function() {
        time.textContent--;        
        if (+time.textContent === 0) {
            clearInterval(interval)
            endGame()
        }
    }, 1000)
    
    renderBox()
}

function setGameScore() {
    result.textContent = score.toString()
}

function setGameTime() {
    time.textContent--
}

function endGame() {
    isGameStarted = false
    setGameScore()
    start.classList.remove('hide')
    game.innerHTML = ''
    game.style.backgroundColor = '#ccc'
    timeHeader.classList.add('hide') //скрываем время в конце игры
    resultHeader.classList.remove('hide') // показываем результат

}

function handleBoxClick(event){
    if (!isGameStarted){
        return
    }

    if (event.target.dataset.box){
        score++
        renderBox()
    }
}

function renderBox(){
    game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let gameSize = game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true') //как определить что клик по квадрату

    game.insertAdjacentElement('afterbegin', box) //добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.
}

//динамически меняем местоположение квадрата и размер
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}