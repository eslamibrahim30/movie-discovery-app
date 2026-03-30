// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router";
// import "./index.css";
// import "./App.css";
// import MainLayout from "./components/Layout/MainLayout";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AccountPage from "./pages/AccountPage";
// import NotFound from "./pages/NotFound";
// import MoviesListPage from "./pages/MoviesListPage";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import WishlistPage from "./pages/WishlistPage";
// import App from "./App";
// import ProtectedRoute from "./pages/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       // {
//       //   index: true,
//       //   element: <div>Home</div>,
//       // },
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "/account",
//         element: <AccountPage />,
//       },
//       {
//         path: "movies",
//         element: <MoviesListPage />,
//       },

//       {
//         path: "/movie/:id",
//         element: <MovieDetailsPage />,
//       },
//       {
//         path: "/wishlist",
//         element: <WishlistPage />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <App /> }, // Set home page
//       { path: "login", element: <LoginPage /> },
//       { path: "register", element: <RegisterPage /> },
//       { path: "movies", element: <MoviesListPage /> },
//       { path: "movie/:id", element: <MovieDetailsPage /> },
      
//       // Protected Routes
//       {
//         element: <ProtectedRoute />,
//         children: [
//           { path: "account", element: <AccountPage /> },
//           { path: "wishlist", element: <WishlistPage /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
    {/* <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}

        {/* Wrap private routes with ProtectedRoute */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes> */}
  {/* </StrictMode>,
); */}

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
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import App from "./App";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "movies", element: <MoviesListPage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "account", element: <AccountPage /> },
          { path: "wishlist", element: <WishlistPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);