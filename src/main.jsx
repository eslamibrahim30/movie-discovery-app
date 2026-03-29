import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import MoviesListPage from "./pages/MoviesListPage";
import React from "react";
import ReactDOM from "react-dom/client";
import MovieDetailsPage from "./pages/MovieDetailsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // {
      //   index: true,
      //   element: <div>Home</div>,
      // },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "movies",
        element: <MoviesListPage />,
      },

      {
        path: "/movie/:id", // ✅ مهم جدًا
        element: <MovieDetailsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
