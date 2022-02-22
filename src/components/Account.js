import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { LogoutApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../toastify";

const Account = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const API_URL = "https://dj-react-todotaskapp-backend.herokuapp.com/users/auth/logout/";

  const LogOut = async () => {
    try {
      await LogoutApi(API_URL);
      successToastify(`Signed out succesfully. See you soon 👋`);
      setCurrentUser();
      localStorage.clear();
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
  };
  return (
    <Box sx={{ mt: 1, mx: 1, width: "250px", maxHeight: "250px" }}>
      <Typography sx={{ textAlign: "center" }}>
        <code>ACCOUNT</code>
      </Typography>
      <hr />
      <Typography sx={{}}>
        <code>Username: {currentUser.data.user.username}</code>
      </Typography>
      <Typography sx={{}}>
        <code>Email: {currentUser.data.user.email}</code>
      </Typography>
      <hr />
      <MenuItem onClick={LogOut}><code>Logout</code></MenuItem>
    </Box>
  );
};

export default Account;
