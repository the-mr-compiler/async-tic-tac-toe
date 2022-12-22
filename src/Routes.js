import { createBrowserRouter } from "react-router-dom";
import { RequireAuth, isLoggedIn } from "./firebase/AuthContext";
import EntryPage from "./pages/auth/EntryPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import NewGamePage from "./pages/NewGamePage";

const router = createBrowserRouter([
  {
    path: "/game/:gameid",
    element: (
      <RequireAuth>
        <GamePage />
      </RequireAuth>
    ),
  },
  {
    path: "/new-game",
    element: (
      <RequireAuth>
        <NewGamePage />
      </RequireAuth>
    ),
  },
  {
    path: "/new-game/:opponentEmail",
    element: (
      <RequireAuth>
        <NewGamePage />
      </RequireAuth>
    ),
  },
  {
    path: "/auth",
    element: <EntryPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
    loader: isLoggedIn,
  },
]);

export { router };
