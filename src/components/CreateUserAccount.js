import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
  AppBar,
  Grid2,
  createTheme,
  ThemeProvider,
  Stack,
  Snackbar,
} from "@mui/material";
import logo from "../logo.png";
import { FormContainer, Header } from "../style";
import CustomTextField from "./CustomTextField";
import CustomButton from "./CustomButton";
import axios from "axios";
import CustomToast from "./CustomToast";
import { day, months } from "../constants";

const CreateUserAccount = () => {
  const [formStatus, setFormStatus] = useState("");
  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Full name must not contain symbols or numbers")
      .required("Full name is required"),

    contactNumber: Yup.string()
      .matches(
        /^(\+?1 ?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Contact number must be in the format (XXX) XXX-XXXX or XXX-XXX-XXXX"
      )
      .required("Contact number is required"),

    day: Yup.string().required("Day is required"),

    month: Yup.string().required("Month is required"),

    year: Yup.number()
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Year is required"),

    email: Yup.string()
      .email("Sorry, this email address is not valid. Please try again.")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      contactNumber: "",
      day: "",
      month: "",
      year: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleCreateUser();
    },
  });
  const handleToastOpen = useCallback(() => {
    setOpenToast(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setOpenToast(false);
  }, []);

  useEffect(() => {
    if (openToast) {
      const timer = setTimeout(() => {
        handleToastClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [openToast, handleToastClose]);

  const handleCreateUser = async () => {
    try {
      await axios
        .post("https://fullstack-test-navy.vercel.app/api/users/create", {
          full_name: formik.values.fullName,
          contact_number: formik.values.contactNumber,
          email: formik.values.email,
          date_of_birth:
            formik.values.day / formik.values.month / formik.values.year,
          password: formik.values.password,
          confirm_password: formik.values.confirmPassword,
        })
        .then(() => {
          setMessage("User account successfully created.");
          setFormStatus("success");
          handleToastOpen();
          formik.resetForm();
        });
    } catch (error) {
      setMessage("There was an error creating the account.");
      setFormStatus("error");
      handleToastOpen();
    }
  };
  return (
    <>
      <Header position="static">
        <img className="logo" src={logo} />
      </Header>
      <FormContainer maxWidth="sm">
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#252f3D">
          Create User Account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box className="form__container">
            <Grid2 container spacing={2}>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Full Name
                </Typography>
                <CustomTextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.errors.fullName && formik.touched.fullName
                  )}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid2>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Contact Number
                </Typography>
                <CustomTextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.errors.contactNumber && formik.touched.contactNumber
                  )}
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid2>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Birthdate
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              <Grid2 item size={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Day"
                  name="day"
                  value={formik.values.day}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.day && formik.touched.day)}
                  helperText={formik.touched.day && formik.errors.day}
                >
                  {day.map((day, i) => (
                    <MenuItem key={i} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid2>
              <Grid2 item size={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Month"
                  name="month"
                  value={formik.values.month}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.month && formik.touched.month)}
                  helperText={formik.touched.month && formik.errors.month}
                >
                  {months.map((month, i) => (
                    <MenuItem key={i} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid2>
              <Grid2 item size={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Year"
                  name="year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.year && formik.touched.year)}
                  helperText={formik.touched.year && formik.errors.year}
                >
                  {[...Array(1000)].map((_, i) => (
                    <MenuItem key={i} value={2024 - i}>
                      {2024 - i}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Email Address
                </Typography>
                <CustomTextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.email && formik.touched.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid2>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Password
                </Typography>
                <CustomTextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.errors.password && formik.touched.password
                  )}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid2>
              <Grid2 item size={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  color="#333333"
                >
                  Confirm Password
                </Typography>
                <CustomTextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                  )}
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid2>
              {/* <Grid2> */}

              <CustomToast
                open={openToast}
                severity={formStatus}
                message={message}
              />
              {/* </Grid2> */}
            </Grid2>
          </Box>
          <Stack
            direction={"row"}
            justifyContent="center"
            className="btn__container"
          >
            <CustomButton variant="outlined" color="primary" className="btn">
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              className="btn"
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </FormContainer>
    </>
  );
};

export default CreateUserAccount;
