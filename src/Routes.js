import { createBrowserRouter } from "react-router-dom";
import EntryPage from "./pages/auth/EntryPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import NewGamePage from "./pages/NewGamePage";

const router = createBrowserRouter([
  { path: "/game/:gameid", element: <GamePage /> },
  { path: "/new-game", element: <NewGamePage /> },
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
  { path: "/home", element: <HomePage /> },
  { path: "/", element: <HomePage /> },
]);

export { router };
