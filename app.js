/**
 * 0 = no piece
 * 1 = piece player 1
 * 2 = piece player 2
 */

var matrix = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0],
  [0,1,0,2,2,0,0],
  [1,2,0,1,2,0,0],
]

var currentPlayer = 1 

window.onload = function() {
  var board = document.getElementById('board')
  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      var cell = document.getElementById(x + '-' + y)
      cell.onclick = onclickPiece
    })
  })
  printBoard()
}

var onclickPiece = function(evt) {
  var idValues = evt.srcElement.id.split('-')
  matrix[idValues[1]][idValues[0]] = currentPlayer
  printBoard()
  currentPlayer = currentPlayer === 1 ? 2 : 1
}

var printBoard = function() {
  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      var cell = document.getElementById(x + '-' + y)
      if(value === 1) {
        cell.className = "cell piece pieceOne";
      } else if (value === 2) {
        cell.className =  "cell piece pieceTwo";
      }
    })
  })
}