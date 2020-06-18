/**
 * 0 = no piece
 * 1 = piece player 1
 * -1 = piece player 2
 */

var matrix = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
]

var initialMatrix = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
]

var currentPlayer = 1 
var gameState = 'PLAY'

window.onload = function() {
  var board = document.getElementById('board')
  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      var cell = document.getElementById(x + '-' + y)
      cell.onclick = onclickPiece
      cell.onmouseover = onmouseoverPiece(x)
      cell.onmouseout = onmouseoutPiece(x)
    })
  })
  printBoard()
  var resetButton = document.getElementById('reset')
  resetButton.onclick = function() {
    matrix = initialMatrix
    gameState = 'PLAY'
    printBoard()
  }
}

var onmouseoutPiece = function(x) {
  return function() {
    var arrow = document.getElementById("arrow_" + x)
    arrow.style.borderTop = '30px solid transparent'
  }
}

var onmouseoverPiece = function(x) {
  return function() {
    var arrow = document.getElementById("arrow_" + x)
    arrow.style.borderTop = '30px solid #f0ad4e'
  }
}

var onclickPiece = function(evt) {
  if(gameState === 'PLAY') {
    var idValues = evt.srcElement.id.split('-')
    var x = idValues[0]
    for (let index = 0; index < 6; index++) {
      const value = matrix[index][x]; // obtengo el valor de la posicion
      if(value !== 0) {  
        // si no es cero, hay que pintar la que esta arria (index - 1)
        var cell = document.getElementById(x + '-' + (index - 1))
        if(currentPlayer === 1) {
          cell.className = "cell piece pieceOne";
        } else if (currentPlayer === -1) {
          cell.className =  "cell piece pieceTwo";
        }
        // actualizo el valor de la poscion en la matriz
        matrix[index - 1][x] = currentPlayer
        break // termino la iteracion ya que encontre la posicion a pintar
      } else if (index === 5) {
        // si no hay fichas, pinto la ultima posicion
        var cell = document.getElementById(x + '-' + 5)
        if(currentPlayer === 1) {
          cell.className = "cell piece pieceOne";
        } else if (currentPlayer === -1) {
          cell.className =  "cell piece pieceTwo";
        }
        // actualizo el valor de la poscion en la matriz
        matrix[index][x] = currentPlayer
      }
    }
    // cambio el turno del jugador
    currentPlayer = currentPlayer === 1 ? -1 : 1
    printBoard()
    setTimeout(checkWin, 100)
  }
}

var printBoard = function() {
  var turn = document.getElementById("turno")
  turn.innerText = currentPlayer === 1 ? 'Jugador 2' : 'Jugador 1'
  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      var cell = document.getElementById(x + '-' + y)
      if(value === 1) {
        cell.className = "cell piece pieceOne";
      } else if (value === -1) {
        cell.className =  "cell piece pieceTwo";
      } else {
        cell.className =  "cell";
      }
    })
  })
}

var checkWin = function() {
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      try {
        currentPlayer = currentPlayer === 1 ? -1 : 1
        // horizontal
        var cell1x = matrix[y][x]
        var cell2x = matrix[y][(x + 1)]
        var cell3x = matrix[y][(x + 2)]
        var cell4x = matrix[y][(x + 3)]
        var resultX = (cell1x + cell2x + cell3x + cell4x)
        // vertical
        var cell1y = matrix[y][x]
        var cell2y = matrix[(y + 1)][x]
        var cell3y = matrix[(y + 2)][x]
        var cell4y = matrix[(y + 3)][x]
        var resultY = (cell1y + cell2y + cell3y + cell4y)
        if(Math.abs(resultY) === 4 || Math.abs(resultX) === 4) {
          alert('gano' + currentPlayer)
          gameState = 'END'
          break
        }
      }
      catch(error){
        // nada
      }
    }
  }
}