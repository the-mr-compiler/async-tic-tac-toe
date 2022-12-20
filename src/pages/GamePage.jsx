import React, { useState } from "react";
import { useParams } from "react-router-dom";

import GameBoard from "../components/GameBoard";
export default function GamePage() {
  const { gameid } = useParams();

  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);

  const [winStatus, setWinStatus] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleClick = (index) => {
    const newSquares = [...squares];
    if (!disabled) newSquares[index] = "X";
    else newSquares[index] = "O";
    setDisabled(!disabled);
    setSquares(newSquares);
    setWinStatus("It’s a Draw!");
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex flex-column pb-2">
        <div className="h1 w-75">Game with Tanmay</div>
        <div className="mt-1 fw-light">Your piece</div>
        <div
          className="font-bilbo text-primary"
          style={{ fontSize: 56, fontWeight: 900 }}
        >
          X
        </div>
        <div className="flex-grow-1">
          <div className="bg-warning bg-opacity-50">
            <div className="text-center py-3">
              {winStatus ? winStatus : disabled ? "Their move" : "Your move"}
            </div>
            <GameBoard
              squares={squares}
              handleClick={handleClick}
              // handleClick={!disabled ? handleClick : null}
            />
            <div className="p-3"></div>
          </div>
        </div>
      </div>

      <div className="d-flex pb-4">
        <button
          className="btn btn-warning btn-lg w-100 text-white"
          type="button"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

/* <GameBoard
              squares={[" ", "", "", "", "", "", "", "", ""]}
              handleClick={(int) => {
                console.log(int);
              }}
            /> */
