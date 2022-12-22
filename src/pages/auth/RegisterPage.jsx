import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../firebase/AuthContext";

export default function RegisterPage() {
  const { signup } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, username, email, password).then((response) => {
      setError(response);
      setTimeout(() => {
        setError("");
        if (response === "success") {
          navigate("/");
        }
      }, 3000);
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
          <div className="h6">Create account</div>
          <div className="h1 w-75">Let’s get to know you better!</div>
          <div className="mt-5 mb-2">
            <label htmlFor="inputYourName" className="form-label fw-semibold">
              Your name
            </label>
            <input
              type="text"
              className="form-control p-3"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="inputYourName"
              placeholder="Type your name here"
            />
          </div>
          <div className="my-2">
            <label htmlFor="inputUsername" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control p-3"
              id="inputUsername"
              value={username}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                setUsername(value);
                if (value.includes(" ")) {
                  e.target.classList.add("is-invalid");
                } else {
                  e.target.classList.remove("is-invalid");
                }
              }}
              placeholder="Type your username here"
            />
          </div>
          <div className="my-2">
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
                setEmail(e.target.value.toLocaleLowerCase());
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
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here"
            />
          </div>
        </div>
        <div
          className={
            "alert text-white fade" +
            (error !== "" ? " show" : "") +
            (error === "success" ? " bg-success" : " bg-danger")
          }
          role="alert"
        >
          {error === "success" ? "Congratulations!!! Account created." : error}
        </div>
        <div className="d-flex pb-4">
          <button
            onClick={handleSubmit}
            className="btn btn-warning btn-lg w-100"
            type="button"
            disabled={
              name === "" ||
              username === "" ||
              email === "" ||
              password === "" ||
              username.includes(" ") ||
              !validateEmail(email)
            }
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
