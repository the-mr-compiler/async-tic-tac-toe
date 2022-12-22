import React from "react";

import oIcon from "../assets/O.svg";
import xIcon from "../assets/X.svg";

import "./GameBoard.css";
export default function GameBoard({ board, handleClick, disabled }) {
  return (
    <div className="board">
      {board.map((square, index) => (
        <button
          key={"square" + index}
          onClick={square !== "" || disabled ? null : () => handleClick(index)}
          className={"btn btn-light rounded-0 square"}
        >
          {square === "X" ? (
            <img src={xIcon} alt="X" />
          ) : square === "O" ? (
            <img src={oIcon} alt="O" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
