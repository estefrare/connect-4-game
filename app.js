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

window.onload = function() {
  var board = document.getElementById('board')

  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      var cell = document.getElementById('x' + x + 'y' + y)
      if(value === 1) {
        cell.className = cell.className + " piece pieceOne";
      } else if (value === 2) {
        cell.className = cell.className + " piece pieceTwo";
      }
    })
  })
}