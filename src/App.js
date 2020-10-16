import React, { useState } from "react";
import "./styles.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  }

  return (
    <div>
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
  const [rec, setRec] = useState({
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true
  });

  function handleClick(i) {
    const history = rec.history;
    const current = history[history.lenght - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = rec.xIsNext ? "X" : "0";
    setRec({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      xIsNext: !setRec.xIsNext
    });
  }

  const history = rec.history;
  const current = history[history.lenght - 1];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = "Next turn: " + (setRec.xIsNext ? "X" : "0");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
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
