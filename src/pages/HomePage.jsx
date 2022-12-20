import React, { useState } from "react";

export default function HomePage() {
  const [games, setGames] = useState([""]);

  return (
    <div className="d-flex h-100 flex-column">
      <div className="h2 fw-bold">Your Games</div>
      {games.length === 0 ? (
        <div className="flex-grow-1 d-flex flex-column text-center align-items-center justify-content-center">
          <div className="px-5 font-bilbo text-center" style={{ fontSize: 64 }}>
            No Games Found
          </div>
          <button
            className="btn w-100 p-3 text-white btn-warning btn-lg"
            type="button"
          >
            Start a new game
          </button>
        </div>
      ) : (
        <div className="flex-grow-1 d-flex flex-column">
          <div className="card shadow-lg mt-3">
            <div className="card-header border-0 h3">Game with Tanmay</div>
            <div className="card-body">
              <div>Tanmay just made their move!</div>
              <div>It’s your turn to play now.</div>

              <div className="mt-4">9th June 2022, 3:15pm</div>
              <div className="d-flex pt-4">
                <button
                  className="btn btn-warning btn-lg w-100 text-white"
                  type="button"
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
