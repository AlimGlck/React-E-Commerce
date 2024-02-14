import React from "react";
import { useAuth } from "../../contexts/Authcontext.js";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <h2>Profile</h2>
      <code>{JSON.stringify(user)}</code>

      <br />
      <br />
      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
