import React from "react";
import propTypes from "prop-types";
import "./GameBoard.css";
export default function GameBoard({ squares, handleClick, disabled }) {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button
          onClick={square !== "" ? null : () => handleClick(index)}
          className={
            "btn btn-light rounded-0 square font-bilbo fw-bolder " +
            (square === "X" ? "text-primary" : "text-danger")
          }
        >
          {square}
        </button>
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  squares: propTypes.arrayOf(propTypes.string).isRequired,
  handleClick: propTypes.func.isRequired,
};
