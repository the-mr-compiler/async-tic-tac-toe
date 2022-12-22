import React from "react";

import { useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar";
import { AuthContext } from "../../firebase/AuthContext";

export default function LoginPage() {
  const { signin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    signin(email, password).then((resp) => {
      if (resp) {
        navigate("/");
      } else {
        setError("Enter correct details.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
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
          <div className="h6">Login</div>
          <div className="h1 w-75">Please enter your details</div>
          <div className="mt-5 mb-2">
            <label htmlFor="inputEmail" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control p-3"
              onError={(e) => {
                return "Invalid email";
              }}
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
              placeholder="Type your email here"
            />
          </div>
          <div className="my-2">
            <label htmlFor="inputPassword" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="inputPassword"
              placeholder="Type your password here"
            />
          </div>
        </div>
        <div
          className={
            "alert bg-danger text-white fade" + (error !== "" ? " show" : "")
          }
          role="alert"
        >
          {error}
        </div>
        <div className="d-flex pb-4">
          <button
            className="btn btn-warning btn-lg w-100 text-white"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
