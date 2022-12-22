import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthContext, AuthProvider, isLoggedIn } from "./firebase/AuthContext";
import { router } from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="fix-width p-4 vh-100 d-flex flex-column">
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  </React.StrictMode>
);

export default function App() {
  const { setUser } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    isLoggedIn().then((response) => {
      setUser(response);
      setIsLoading(false);
    });
  }, [1]);
  return (
    <>
      {isLoading ? (
        <div className="container d-flex h-100 justify-content-center">
          <div className="row justify-content-center align-self-center text-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}
