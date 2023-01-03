document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let blocks = [Array.from(document.querySelectorAll('.grid div')).slice(0, 10),
    Array.from(document.querySelectorAll('.grid div')).slice(10, 20),
    Array.from(document.querySelectorAll('.grid div')).slice(20, 30),
    Array.from(document.querySelectorAll('.grid div')).slice(30, 40),
    Array.from(document.querySelectorAll('.grid div')).slice(40, 50),
    Array.from(document.querySelectorAll('.grid div')).slice(50, 60),
    Array.from(document.querySelectorAll('.grid div')).slice(60, 70),
    Array.from(document.querySelectorAll('.grid div')).slice(70, 80),
    Array.from(document.querySelectorAll('.grid div')).slice(80, 90),
    Array.from(document.querySelectorAll('.grid div')).slice(90, 100),
    Array.from(document.querySelectorAll('.grid div')).slice(100, 110),
    Array.from(document.querySelectorAll('.grid div')).slice(110, 120),
    Array.from(document.querySelectorAll('.grid div')).slice(120, 130),
    Array.from(document.querySelectorAll('.grid div')).slice(130, 140),
    Array.from(document.querySelectorAll('.grid div')).slice(140, 150),
    Array.from(document.querySelectorAll('.grid div')).slice(150, 160),
    Array.from(document.querySelectorAll('.grid div')).slice(160, 170),
    Array.from(document.querySelectorAll('.grid div')).slice(170, 180),
    Array.from(document.querySelectorAll('.grid div')).slice(180, 190),
    Array.from(document.querySelectorAll('.grid div')).slice(190, 200),
  ]
  let board = [new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill(null),
    new Array(10).fill('-')
  ]
  const scoreOutput = document.querySelector('#score')
  const startButton = document.querySelector('#start-button')

  let timer
  let score = 0
  let alive = false

  let currentBlock
  let currentPosition
  let currentRotation
  let random

  const lTetromino = [
    [[1, 1], [1, 2], [1, 3], [2, 3]],
    [[0, 1], [1, 1], [2, 1], [2, 0]],
    [[1, 0], [2, 0], [2, 1], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]]
  ]

  const zTetromino = [
    [[1, 1], [1, 2], [2, 0], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[1, 1], [1, 2], [2, 0], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
  ]

  const sTetromino = [
    [[0, 1], [1, 0], [1, 1], [2, 0]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[0, 1], [1, 0], [1, 1], [2, 0]],
    [[1, 0], [1, 1], [2, 1], [2, 2]]
  ]

  const tTetromino = [
    [[0, 1], [1, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [2, 1]]
  ]

  const oTetromino = [
    [[1, 1], [1, 2], [2, 1], [2, 2]],
    [[1, 1], [1, 2], [2, 1], [2, 2]],
    [[1, 1], [1, 2], [2, 1], [2, 2]],
    [[1, 1], [1, 2], [2, 1], [2, 2]]
  ]

  const iTetromino = [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]]
  ]

  const keys = ['L','Z','S','T','O','I']
  const theTetrominoes = {'L': lTetromino, 'Z': zTetromino, 'S': sTetromino, 'T': tTetromino, 'O': oTetromino, 'I': iTetromino}

  startButton.addEventListener('click', () => {
    startButton.style.display = 'none'
    currentPosition = [0, 4]
    currentRotation = 0
    random = keys[Math.floor(Math.random() * keys.length)]
    currentBlock = theTetrominoes[random][currentRotation]
    document.addEventListener('keyup', keyPress)
    timer = setInterval(moveDown, 1000)
    alive = true
    addTetromino()
  })

  function pausePlay () {
    if (timer) {
      scoreOutput.innerHTML = 'Paused'
      clearInterval(timer)
      timer = null
    } else {
      if (alive) {
        scoreOutput.innerHTML = score
        timer = setInterval(moveDown, 1000)
      }
    }
  }

  function addTetromino () {
    currentBlock.forEach(vector => {
      blocks[currentPosition[0] + vector[0]][currentPosition[1] + vector[1]].id = random
    })
  }

  function removeTetromino () {
    currentBlock.forEach(vector => {
      blocks[currentPosition[0] + vector[0]][currentPosition[1] + vector[1]].id = ''
    })
  }

  function keyPress (key) {
    if (key.keyCode === 27) {
      pausePlay()
    }
    if (timer) {
      if (key.keyCode === 37) {
        moveLeft()
      } else if (key.keyCode === 39) {
        moveRight()
      } else if (key.keyCode === 40) {
        moveDown()
      } else if (key.keyCode === 38) {
        rotateRight()
      } else if (key.keyCode === 70) {
        rotateLeft()
      }
    }
  }

  function checkRotation () {
    if ((currentPosition[1] + 1) < 4) {
      if (currentBlock.some(vector => (currentPosition[1] + vector[1]) === -1)) {
        currentPosition[1] += 1
        checkRotation()
      }
    } else if (currentPosition[1] > 5) {
      if (currentBlock.some(vector => (currentPosition[1] + vector[1]) === 10)) {
        currentPosition[1] -= 1
        checkRotation()
      }
    }
    if (currentBlock.some(vector => board[currentPosition[0] + vector[0]][currentPosition[1] + vector[1]] != null)) {
      return false
    } else {
      return true
    }
  }
  
  function rotateRight () {
    currentRotation++
    if (currentRotation === currentBlock.length) {
      currentRotation = 0}
    removeTetromino()
    currentBlock = theTetrominoes[random][currentRotation]
    if (checkRotation()) {-
      addTetromino()
    } else {
      rotateLeft()
    }
  }

  function rotateLeft () {
    currentRotation -= 1
    if (currentRotation === -1) {
      currentRotation = currentBlock.length - 1}
    removeTetromino()
    currentBlock = theTetrominoes[random][currentRotation]
    if (checkRotation()) {
      addTetromino()
    } else {
      rotateRight()
    }
  }
  
  function moveDown () {
    removeTetromino()
    currentPosition[0] += 1
    addTetromino()
    checkBelow()
  }

  function moveLeft () {
    if (currentBlock.some(vector => (currentPosition[1] + vector[1]) === 0)) return
    if (currentBlock.some(vector => board[currentPosition[0] + vector[0]][currentPosition[1] + vector[1] - 1] != null)) return
    removeTetromino()
    currentPosition[1] -= 1
    addTetromino()
  }

  function moveRight () {
    if (currentBlock.some(vector => (currentPosition[1] + vector[1]) === 9)) return
    if (currentBlock.some(vector => board[currentPosition[0] + vector[0]][currentPosition[1] + vector[1] + 1] != null)) return
    removeTetromino()
    currentPosition[1] += 1
    addTetromino()
  }

  // freeze function
  function checkBelow () {
    if (currentBlock.some(vector => board[currentPosition[0] + vector[0] + 1][currentPosition[1] + vector[1]] != null)) {
      currentBlock.forEach(vector => board[currentPosition[0] + vector[0]][currentPosition[1] + vector[1]] = random)
      score += 1
      scoreOutput.innerHTML = score
      random = keys[Math.floor(Math.random() * keys.length)]
      currentBlock = theTetrominoes[random][currentRotation]
      currentPosition = [0, 4]
      currentRotation = 0
      gameOver()
      if (alive) {
        addTetromino()
        checkRows()
      }
    }
  }

  function checkRows () {
    count = 0
    for (let i = 0; i < 20; i += 1) {
      const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      if (row.every(index => board[i][index] != null)) {
        count += 1
        score += 10
        scoreOutput.innerHTML = score
        row.forEach(index => {
          board[i][index] = null
          blocks[i][index].id = ''
        })
        const boardRemoved = board.splice(i, 1)
        board = boardRemoved.concat(board)
        const squaresRemoved = blocks.splice(i, 1)
        blocks = squaresRemoved.concat(blocks)
        blocks.forEach(line => {
          line.forEach(block => grid.appendChild(block))
        })
      }
    }
    if (count == 4) {
      score += 40
      scoreOutput.innerHTML = score
    }
  }

  function gameOver () {
    document.removeEventListener('keyup', keyPress)
    if (currentBlock.some(vector => board[currentPosition[0] + vector[0]][currentPosition[1] + vector[1]] != null)) {
      alert('Game Over!')
      clearInterval(timer)
      timer = null
      alive = false
      uploadScore()
    } else {
      document.addEventListener('keyup', keyPress)
    }
  }

  function uploadScore () {
    const url = 'http://127.0.0.1:80/leaderboard.php'
    var param = 'score=' + score
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function() {//Call a function when the state changes.
      if(xhr.readyState == 4 && xhr.status == 200) {
          // alert(xhr.responseText);
      }
    }
    xhr.send(param);
  }
})
