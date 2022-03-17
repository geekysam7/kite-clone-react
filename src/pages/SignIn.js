import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthContainer } from "components";
import { setCurrentUser } from "action/user.action";
import {
  passwordConditionCheck,
  showMaintainanceAlert,
  userIdConditionCheck,
} from "utils/general.utils";

export default function SignIn() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = {};

    if (userIdConditionCheck(userId)) {
      error.user = "User Id should be minimum 6 characters.";
    }

    if (passwordConditionCheck(password)) {
      error.password = "Password should be minimum 6 characters";
    }

    if (error.user || error.password) {
      setError(error);
      return;
    }

    setIsLoading(true);

    //dispatch;

    dispatch(
      setCurrentUser({
        currentUser: {
          userName: userId,
        },
      })
    );

    setIsLoading(false);
  };

  useEffect(() => {
    if (error.user && userIdConditionCheck(userId)) {
      let newError = { ...error };
      delete newError.user;
      setError(newError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (error.password && passwordConditionCheck(password)) {
      let newError = { ...error };
      delete newError.password;
      setError(newError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
