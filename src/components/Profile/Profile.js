import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

function Profile() {
  const { user } = useContext(UserContext);
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

export default Profile;
