import React from "react";

export default function NewGamePage() {
  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-grow-1">
        <div className="h6">Start a new game</div>
        <div className="h1 w-75">Whom do you want to play with?</div>
        <div class="mt-5 mb-2">
          <label for="inputEmail" class="form-label fw-semibold">
            Email
          </label>
          <input
            type="email"
            class="form-control p-3"
            id="inputEmail"
            placeholder="Type their email here"
          />
        </div>
      </div>
      <div class="alert bg-danger text-white fade" role="alert">
        Enter correct details.
      </div>
      <div className="d-flex pb-4">
        <button
          className="btn btn-warning btn-lg w-100 text-white"
          type="button"
        >
          Start game
        </button>
      </div>
    </div>
  );
}
