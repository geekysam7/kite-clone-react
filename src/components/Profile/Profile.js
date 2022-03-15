import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = () => {
    if (user.userName) {
      let initial = user.userName.split(" ").reduce((acc, i) => acc + i[0], "");
      return initial.slice(0, 2);
    }

    return "US";
  };

  return (
    <div
      className="profile"
      onClick={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <div className="profile-initials">{initials()}</div>
      <div className="profile-userId">USER01</div>
    </div>
  );
}
