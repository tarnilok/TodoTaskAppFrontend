import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { RegisterApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../toastify";

const initialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const API_URL = 'http://127.0.0.1:8000/users/register/'

  const SignUp = async (...args) => {
    try {
      const userCredential = await RegisterApi(API_URL, ...args);
      successToastify( `${userCredential.data.message} Welcome 🖐`);
    } catch (error) {
      errorToastify("Something went wrong. Please try again!");
    }
  }

  const onSubmit =(values) => SignUp(values);

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <>
      <Typography sx={{ textAlign: "center" }}>
        <code>REGISTER</code>
      </Typography>
      <hr />
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, mx:1, width: "300px", maxHeight: "450px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField autoComplete="userName" name="userName" fullWidth id="userName" variant="filled" label="User Name" onChange={formik.handleChange} value={formik.values.userName} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField autoComplete="fname" name="firstName" fullWidth id="firstName" variant="filled" label="First Name" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth id="lastName" variant="filled" label="Last Name" name="lastName" autoComplete="lname" onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="email" variant="filled" label="Email Address" name="email" autoComplete="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="password" label="Password" type="password" id="password" variant="filled" autoComplete="new-password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="password2" label="Confirm Password" type="password" id="password2" variant="filled" autoComplete="new-password" onChange={formik.handleChange} value={formik.values.password2} onBlur={formik.handleBlur} />
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
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Register;
