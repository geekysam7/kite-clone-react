import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import AuthContainer from "../components/Container/AuthContainer";
import { showMaintainanceAlert } from "../utils/functions";

function SignIn() {
  const { dispatch } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = {};

    if (userId.length < 6 || userId.length > 25) {
      error.user = "User Id should be minimum 6 characters.";
    }

    if (password.length < 6 || userId.length > 18) {
      error.password = "Password should be minimum 6 characters";
    }

    if (error.user || error.password) {
      setError(error);
      return;
    }

    setIsLoading(true);

    //dispatch;

    dispatch({
      type: "login",
      payload: {
        userName: userId,
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (error && error.user && userId.length) {
      let newError = { ...error };
      delete newError.user;
      setError(newError);
    }
  }, [userId]);

  useEffect(() => {
    if (error && error.password && password.length) {
      let newError = { ...error };
      delete newError.password;
      setError(newError);
    }
  }, [password]);

  return (
    <AuthContainer>
      <div className="auth-container">
        {showMaintainanceAlert() && (
          <div className="auth-container--alert">
            Kite is undergoing nightly maintenance and cleanup. Your funds and
            margins may not show correctly until 6:30 AM.
          </div>
        )}
        <form className="auth-container--form" onSubmit={handleSubmit}>
          <div className="auth-container--image">
            <img src="/images/kite.png" alt="Kite logo" />
          </div>
          <div className="auth-container--heading">Login to Kite</div>
          <div className="input-wrapper">
            <input
              placeholder="User Name (eg: Sameer)"
              type="text"
              value={userId}
              autoFocus={true}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          {error.user && <div className="error-wrapper">{error.user}</div>}
          <div className="input-wrapper">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error.password && (
            <div className="error-wrapper">{error.password}</div>
          )}
          <div className="input-wrapper">
            <button type="submit" disabled={!!isLoading}>
              Login
            </button>
          </div>
          {error.global && (
            <div className="error-wrapper error-global">{error.global}</div>
          )}
        </form>
      </div>
    </AuthContainer>
  );
}

export default SignIn;
