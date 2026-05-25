import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/form/Login.jsx";
import Signup from "./components/form/Signup.jsx";
import OAuthCallback from "./components/form/Oauthcallback.jsx";
import { AuthProvider } from "./context/AuthContext";
// import ForgotPassword from "./components/form/ForgotPassword.jsx";
// import ResetPassword from "./components/form/ResetPassword.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/oauth/callback", 
    element: <OAuthCallback /> 
  },
  // {
  //   path: "/forgot-passowrd", 
  //   element: <ForgotPassword /> 
  // },
  // {
  //   path: "/reset-password", 
  //   element: <ResetPassowrd /> 
  // },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
);
