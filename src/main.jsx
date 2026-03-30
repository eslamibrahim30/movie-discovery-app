import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";

import "./index.css";
import "./App.css";

import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "movies",
        element: <MoviesListPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "account",
            element: <AccountPage />,
          },
          {
            path: "wishlist",
            element: <WishlistPage />,
          },
        ],
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
  </StrictMode>
);