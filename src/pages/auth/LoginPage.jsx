import React from "react";

import TopBar from "../../components/TopBar";
export default function LoginPage() {
  return (
    <>
      <TopBar />
      <div className="h-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="h6">Login</div>
          <div className="h1 w-75">Please enter your details</div>
          <div class="mt-5 mb-2">
            <label for="inputUsername" class="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              class="form-control p-3"
              id="inputUsername"
              placeholder="Type your username here"
            />
          </div>
          <div class="my-2">
            <label for="inputPassword" class="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              class="form-control p-3"
              id="inputPassword"
              placeholder="Type your password here"
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
            Login
          </button>
        </div>
      </div>
    </>
  );
}
