/*----- constants -----*/
const lookup = {
  '1': {
    'mark': 'X',
    'color': 'purple'
  },
  '-1': {
    'mark': 'O',
    'color': 'lime'
  },
  'null': {
    'mark': '',
    'color': 'white'
  }
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function handleMove(event) {
  // get index of square
  const idx = parseInt(event.target.id.replace('sq', ''));
  // check if square is occupied, if not return
  if (board[idx] || winner) return;
  // update state
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] +
      board[winningCombos[i][1]] + board[winningCombos[i][2]] === 3)) return board[winningCombos[i][0]];
  }

  if (board.includes(null)) return null;
  return 'T';
}
function render() {
  board.forEach(function(sq, idx) {
    squares[idx].textContent = lookup[sq]['mark'];
    squares[idx].style.color = lookup[sq]['color'];
  });

  if (winner === 'T') {
    message.innerHTML = "Woah it's a TIE!!!";
  } else if (winner) {
    message.innerHTML = `<span style="color:${lookup[winner]['color']}">${lookup[winner]['color'].toUpperCase()}</span> is victorious!`;
  } else {
    message.innerHTML = `<span style="color:${lookup[turn]['color']}"> ${lookup[turn]['color'].toUpperCase()}</span > 's turn!`;;
  }
}

;
