import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";
import { LoginApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../toastify";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const Login = () => {
  const {setCurrentUser} = useContext(AuthContext)
  const API_URL = "https://dj-react-todotaskapp-backend.herokuapp.com/users/auth/login/";

  const SignIn = async (...args) => {
    try {
      const userCredential = await LoginApi(API_URL, ...args)
      successToastify(`Signed in successfully. Welcome ${userCredential.data.user.username} 🖐`);
      localStorage.setItem('userCredential', JSON.stringify(userCredential));
      setCurrentUser(userCredential)
    } catch (error) {
      errorToastify("The password is invalid or the user does not have a password!");
    }
  }

  const onSubmit = (values) => SignIn(values);

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <>
      <Typography sx={{textAlign: 'center'}}><code>LOGIN</code></Typography><hr/>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1, mx:1, width: "300px", maxHeight: "300px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth id="username" variant="filled" label="Username" name="username" autoComplete="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />

          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="email" variant="filled" label="Email Address" name="email" autoComplete="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="password" label="Password" type="password" id="password" variant="filled" autoComplete="new-password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "#046582",
            "&:hover": { bgcolor: "#808080" },
            fontWeight: "bold",
          }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default Login;
