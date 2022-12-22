import React from "react";

import oIcon from "../assets/O.svg";
import xIcon from "../assets/X.svg";

import "./GameBoard.css";
export default function GameBoard({ board, handleClick, disabled, xOwner }) {
  return (
    <div className="board">
      {board.map((square, index) => (
        <button
          key={"square" + index}
          onClick={square !== "" || disabled ? null : () => handleClick(index)}
          className={"btn btn-light rounded-0 square"}
        >
          {square === "X" && xOwner ? (
            <img src={xIcon} alt="X" />
          ) : square === "X" && !xOwner ? (
            <img src={oIcon} alt="O" />
          ) : null}
          {square === "O" && xOwner ? (
            <img src={oIcon} alt="O" />
          ) : square === "O" && !xOwner ? (
            <img src={xIcon} alt="X" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
