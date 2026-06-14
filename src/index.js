// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

// The Client ID is read from .env (never hard-code it in source you push to GitHub).
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* GoogleOAuthProvider must wrap everything that uses Google sign in. */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* BrowserRouter enables React Router navigation across the app. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);