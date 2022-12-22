import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import oIcon from "../assets/O.svg";
import xIcon from "../assets/X.svg";
import GameBoard from "../components/GameBoard";
import { AuthContext } from "../firebase/AuthContext";
import {
  getGameSnapshot,
  getUserByEmail,
  status,
  updateBoard,
  updateStatus,
} from "../firebase/firestore";

import TopBar from "../components/TopBar";

export default function GamePage() {
  const { gameid } = useParams();

  const { currentUser } = useContext(AuthContext);
  const [board, setBoard] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [opponentEmail, setOpponentEmail] = useState(null);
  const [newBoardValues, setNewBoardValues] = useState(null);
  const [owner, setOwner] = useState("");
  const [winStatus, setWinStatus] = useState("");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const checkWin = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        newBoardValues[a] &&
        newBoardValues[a] === newBoardValues[b] &&
        newBoardValues[a] === newBoardValues[c]
      ) {
        if (newBoardValues[a] === "X") return true;
        else return false;
      }
    }
    return null;
  };
  const handleClick = (index) => {
    const newBoard = [...board];
    if (currentUser.uid === owner) newBoard[index] = "X";
    else newBoard[index] = "O";
    setNewBoardValues(newBoard);
  };

  const submitBoard = () => {
    if (
      winStatus === "" &&
      newBoardValues.filter((v, i) => v !== board[i]).length !== 1
    )
      return;
    if (winStatus) {
      navigate("/new-game/" + opponentEmail);
      return;
    }
    if (owner === currentUser.uid)
      updateBoard(gameid, newBoardValues, status.waiting_opponent);
    else updateBoard(gameid, newBoardValues, status.waiting_user);
    const stat = checkWin();
    if (stat !== null) {
      if (stat) updateStatus(gameid, status.complete, currentUser.email);
      else updateStatus(gameid, status.complete, opponentEmail);
      return;
    }
    if (newBoardValues.filter((v) => v === "").length === 0) {
      updateStatus(gameid, status.complete, null);
    }
  };

  useEffect(() => {
    const unsubscribe = getGameSnapshot(gameid, currentUser.email, (game) => {
      setOpponentEmail(game.opponent);
      setOwner(game.owner);
      setBoard(game.board);
      if (!opponent) {
        getUserByEmail(game.opponent).then((user) => {
          setOpponent(user.name);
        });
      }
      setNewBoardValues(game.board);
      if (game.status === status.complete) {
        setDisabled(true);
        if (game.winner === currentUser.email) setWinStatus("You win!");
        else if (game.winner === game.opponent) setWinStatus("You lose!");
        else setWinStatus("Draw!");
      }
      if (
        game.owner === currentUser.uid &&
        game.status === status.waiting_user
      ) {
        setDisabled(false);
      } else if (
        game.owner !== currentUser.uid &&
        game.status === status.waiting_opponent
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });
    return unsubscribe;
  }, [currentUser.uid, gameid]);

  return (
    <>
      <TopBar />
      <div className="h-100 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column pb-2">
          <div className="h1 w-75">Game with {opponent}</div>
          <div className="mt-1 ">Your piece</div>
          <div className="p-3">
            <img src={xIcon} alt="X" />
          </div>
          <div className="flex-grow-1">
            <div className="bg-warning bg-opacity-25">
              <div className="text-center py-3">
                {winStatus ? winStatus : disabled ? "Their move" : "Your move"}
              </div>
              {board && (
                <GameBoard
                  board={newBoardValues}
                  xOwner={owner === currentUser.uid}
                  handleClick={!disabled ? handleClick : null}
                  disabled={disabled}
                />
              )}
              <div className="p-2"></div>
            </div>
          </div>
        </div>

        <div className="d-flex pb-4">
          <button
            className={
              "btn btn-lg w-100 text-white" +
              (!winStatus && disabled ? " bg-secondary" : " btn-warning")
            }
            disabled={!winStatus && disabled}
            type="button"
            onClick={submitBoard}
          >
            {winStatus
              ? "Start another game"
              : disabled
              ? "Waiting for " + opponent
              : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
