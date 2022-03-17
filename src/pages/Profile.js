import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentUser } from "action/user.action";
import {
  passwordConditionCheck,
  userIdConditionCheck,
  validateEmail,
} from "utils/general.utils";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [userId, setUserId] = useState(currentUser.userName);
  const [password, setPassword] = useState(currentUser.password || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [error, setError] = useState({});
  const [, setIsLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = {};

    if (userIdConditionCheck(userId)) {
      error.user = "User Id should be minimum 6 characters.";
    }

    if (passwordConditionCheck(password)) {
      error.password = "Password should be minimum 6 characters";
    }

    if (!validateEmail(email)) {
      error.email = "Please provide a valid email address";
    }

    if (error.user || error.password || error.email) {
      setError(error);
      return;
    }

    setIsLoading(true);

    //dispatch;

    dispatch(
      setCurrentUser({
        currentUser: {
          userName: userId,
          password,
          email,
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

  useEffect(() => {
    if (error.email && !validateEmail(email)) {
      let newError = { ...error };
      delete newError.email;
      setError(newError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div className="holding">
      <div className="heading">Account Details</div>
      <div className="profile-wrapper">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form--entity">
            <label className="profile-form--label" htmlFor="username">
              User Name
            </label>
            <input
              className="profile-form--input"
              type="text"
              id="username"
              placeholder="Username"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          {error.user && <div className="error-wrapper">{error.user}</div>}
          <div className="profile-form--entity">
            <label className="profile-form--label" htmlFor="password">
              Password
            </label>
            <input
              className="profile-form--input"
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error.password && (
            <div className="error-wrapper">{error.password}</div>
          )}
          <div className="profile-form--entity">
            <label className="profile-form--label" htmlFor="email">
              Email
            </label>
            <input
              className="profile-form--input"
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error.email && <div className="error-wrapper">{error.email}</div>}
          <div className="profile-form-button">
            <button className="profile-form--save" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
