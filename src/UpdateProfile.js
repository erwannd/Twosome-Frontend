import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/updateprofile.css";

export default function ProfileUpdater({ user, username }) {
  const [userHandle, setUserHandle] = useState(username);

  // No call to preventDefault here to force page refresh
  // so that the updated user profile can be seen
  const handleSubmit = async () => {
    console.log(userHandle);

    const patchData = {
      userId: user.uid,
      name: userHandle,
    };

    try {
      const response = await axios.patch(
        `https://twosome-backend.wl.r.appspot.com/updateUserProfile/${user.uid}`,
        patchData
      );
      console.log("Updated user profile:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <form className="profile-update-form" onSubmit={handleSubmit}>
        <label className="username-update">
          Your username
          <input
            type="text"
            value={userHandle}
            onChange={(e) => setUserHandle(e.target.value)}
          ></input>
        </label>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
}
