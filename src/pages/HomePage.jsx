import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../firebase/AuthContext";
import { getGamesSnapshot } from "../firebase/firestore";
import plusSign from "../assets/+.svg";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";
export default function HomePage() {
  const [games, setGames] = useState([]);
  const [gamesOpp, setGamesOpp] = useState([]);
  const [allGames, setAllGames] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    return getGamesSnapshot(currentUser.email, setGames, setGamesOpp);
  }, [currentUser.email]);

  useEffect(() => {
    let newGames = [...games, ...gamesOpp];
    newGames = newGames.sort((a, b) => {
      return b.updatedAt.toDate() - a.updatedAt.toDate();
    });
    setAllGames(newGames);
  }, [games, gamesOpp]);

  return (
    <div className="d-flex h-100 flex-column">
      <div className="h2 fw-bold">Your Games</div>
      {allGames.length === 0 ? (
        <div className="flex-grow-1 d-flex flex-column text-center align-items-center justify-content-center">
          <div className="px-5 font-bilbo text-center" style={{ fontSize: 64 }}>
            No Games Found
          </div>
          <button
            className="btn w-100 p-3 text-white btn-warning btn-lg"
            type="button"
            onClick={() => navigate("/new-game")}
          >
            Start a new game
          </button>
        </div>
      ) : (
        <>
          <div className="flex-grow-1 d-flex flex-column">
            {allGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div
            className="btn btn-dark new-game-btn py-2"
            onClick={() => navigate("/new-game")}
          >
            <img src={plusSign} width="20px" alt="+" /> New Game
          </div>
        </>
      )}
    </div>
  );
}
