import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setLogin(false);
    setRegister(false);
  };
  const LoginLauncher = () => {
    setLogin(true);
  };
  const RegisterLauncher = () => {
    setRegister(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ opacity: 0.3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoApp
          </Typography>
          <div>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            {currentUser ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box sx={{ maxWidth: "600px", maxHeight: "600px" }}>
                  <Account />
                </Box>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box sx={{ maxWidth: "600px", maxHeight: "600px" }}>
                  {login ? (
                    <Login />
                  ) : register ? (
                    <Register />
                  ) : (
                    <>
                      <MenuItem onClick={LoginLauncher}>Login</MenuItem>
                      <MenuItem onClick={RegisterLauncher}>Register</MenuItem>
                    </>
                  )}
                </Box>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
