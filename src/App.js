import React, { useState } from "react";
import "./styles.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [filled, setFilled] = useState({
    squares: Array(9).fill(null),
    xIsNext: true
  });

  function handleClick(i) {
    const squares = filled.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = filled.xIsNext ? "X" : "0";
    setFilled({ squares: squares, xIsNext: !filled.xIsNext });
  }

  function renderSquare(i) {
    return <Square value={filled.squares[i]} onClick={() => handleClick(i)} />;
  }

  const winner = calculateWinner(filled.squares);
  let status;
  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player: " + (filled.xIsNext ? "X" : "0");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
