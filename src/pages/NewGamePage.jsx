import React, { useContext } from "react";
import { newGame } from "../firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { AuthContext } from "../firebase/AuthContext";

export default function NewGamePage() {
  const { currentUser } = useContext(AuthContext);
  const { opponentEmail } = useParams();
  const [email, setEmail] = React.useState(opponentEmail || "");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.email === email) {
      setError("You can't play with yourself");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    newGame(currentUser.email, currentUser.email, email).then((resp) => {
      if (resp === null) {
        setError("Enter correct details.");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }
      navigate("/game/" + resp);
    });
  };

  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  }
  return (
    <>
      <TopBar />
      <div className="h-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="h6">Start a new game</div>
          <div className="h1 w-75">Whom do you want to play with?</div>
          <div className="mt-5 mb-2">
            <label htmlFor="inputEmail" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control p-3"
              id="inputEmail"
              value={email}
              onChange={(e) => {
                if (
                  e.target.value.length > 6 &&
                  !validateEmail(e.target.value)
                ) {
                  e.target.classList.add("is-invalid");
                } else {
                  e.target.classList.remove("is-invalid");
                }
                setEmail(e.target.value.toLowerCase());
              }}
              placeholder="Type their email here"
            />
          </div>
        </div>
        <div
          className={
            "alert bg-danger text-white fade" + (error !== null ? " show" : "")
          }
          role="alert"
        >
          {error}
        </div>
        <div className="d-flex pb-4">
          <button
            className="btn btn-warning btn-lg w-100 text-white"
            type="button"
            disabled={
              email.length < 6 || !validateEmail(email) || error !== null
            }
            onClick={handleSubmit}
          >
            Start game
          </button>
        </div>
      </div>
    </>
  );
}
