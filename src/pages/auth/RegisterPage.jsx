import React from "react";
import TopBar from "../../components/TopBar";

export default function RegisterPage() {
  return (
    <>
      <TopBar />
      <div className="h-100 d-flex flex-column">
        <div className="flex-grow-1">
          <div className="h6">Create account</div>
          <div className="h1 w-75">Let’s get to know you better!</div>
          <div class="mt-5 mb-2">
            <label for="inputYourName" class="form-label fw-semibold">
              Your name
            </label>
            <input
              type="text"
              class="form-control p-3"
              id="inputYourName"
              placeholder="Type your name here"
            />
          </div>
          <div class="my-2">
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
            <label for="inputEmail" class="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              class="form-control p-3"
              id="inputEmail"
              placeholder="Type your email here"
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
        <div class="alert bg-success text-white fade" role="alert">
          Congratulations!!! Account created.
        </div>
        <div className="d-flex pb-4">
          <button className="btn btn-warning btn-lg w-100" type="button">
            Register
          </button>
        </div>
      </div>
    </>
  );
}
