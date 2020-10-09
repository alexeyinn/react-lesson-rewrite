import React, { useState } from "react";
import "./styles.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board() {
  const [filled, setFilled] = useState({ squares: Array(9).fill(null) });

  function handleClick(i) {
    const squares = filled.squares.slice();
    squares[i] = "X";
    setFilled({ squares: squares });
  }

  function renderSquare(i) {
    return <Square value={filled.squares[i]} onClick={() => handleClick(i)} />;
  }

  const status = "Next player: X";

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
