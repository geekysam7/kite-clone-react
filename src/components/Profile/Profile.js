import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = () => {
    if (user.userName) {
      let initial = user.userName.split(" ").reduce((acc, i) => acc + i[0], "");
      return initial.slice(0, 2).toUpperCase();
    }

    return "US";
  };

  return (
    <NavLink to="profile">
      <div
        className="profile cursor"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <div className="profile-initials">{initials()}</div>
        <div className="profile-userId">USER01</div>
      </div>
    </NavLink>
  );
}
