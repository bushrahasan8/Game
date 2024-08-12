import React, { useState } from 'react';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const startGame = () => {
    setGameStarted(true);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>Start Game</button>
      ) : (
        <>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
          </div>
          {winner && <button className="reset-button" onClick={startGame}>Play Again</button>}
        </>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
