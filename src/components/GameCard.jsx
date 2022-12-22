import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthContext";
import { getUserByEmail, status } from "../firebase/firestore";

export default function GameCard({ game }) {
  const [opponent, setOpponent] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const time = `${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`;
    return `${date.getDate()} ${month} ${date.getFullYear()}, ${time}`;
  };

  useEffect(() => {
    getUserByEmail(game.opponent).then((user) => {
      setOpponent(user.name);
    });
  }, [game.opponent]);

  const getStatus = () => {
    if (game.status === status.new && game.owner === currentUser.uid)
      return <div>It's your turn to play now.</div>;
    else if (game.status === status.new && game.owner !== currentUser.uid)
      return (
        <>
          <div>{opponent} created game.</div>
          <div>It's {opponent}'s turn to play.</div>
        </>
      );
    if (game.winner === currentUser.email) return <div>You won!</div>;
    else if (game.winner === game.opponent) return <div>You lost!</div>;
    else return <div>It's a draw!</div>;
  };
  return (
    <div key={game.id} className="card shadow-lg mt-3">
      <div className="card-header border-0 h3">Game with {opponent}</div>
      <div className="card-body">
        {game.status === status.complete || game.status === status.new ? (
          getStatus()
        ) : (game.owner === currentUser.uid &&
            game.status === status.waiting_user) ||
          (game.owner !== currentUser.uid &&
            game.status === status.waiting_opponent) ? (
          <>
            <div>{opponent} just made their move!</div>
            <div>It's your turn to play now.</div>
          </>
        ) : (
          <>
            <div>You just made your move!</div>
            <div>It's {opponent}'s turn to play now.</div>
          </>
        )}
        <div className="mt-4">{formatDate(game.updatedAt.toDate()) + ""}</div>
        <div className="d-flex pt-4">
          <button
            className="btn btn-warning btn-lg w-100 text-white"
            type="button"
            onClick={() => navigate("/game/" + game.id)}
          >
            {game.status === status.complete ? "View game" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
