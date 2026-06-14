// src/components/Login.js
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Login.css";

// Decode the payload of the Google credential (a JWT) without an extra library.
// A JWT is three base64url segments separated by dots: header.payload.signature
function decodeJwt(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If a verified user somehow lands on /login, push them into the app.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = (credentialResponse) => {
    // credentialResponse.credential is the signed Google ID token (JWT).
    const profile = decodeJwt(credentialResponse.credential);
    login({
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    });
    navigate("/", { replace: true });
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1 className="login-brand">
          <span className="brand-ez">EZ</span>
          <span className="brand-tech">Tech</span>
          <span className="brand-movie">Movie</span>
        </h1>
        <p className="login-tagline">Sign in to access StreamList</p>

        <div className="login-button">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error("Google sign in failed")}
            theme="filled_black"
            shape="pill"
            text="signin_with"
          />
        </div>

        <p className="login-note">
          Secured by Google OAuth 2.0. EZTechMovie never sees or stores your
          password.
        </p>
      </div>
    </div>
  );
}