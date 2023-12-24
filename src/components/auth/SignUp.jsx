import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  const API_URL = "http://localhost:3000/auth/signUp";

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            phone: enteredPhone,
          }),
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    signUpData();

    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredPhone("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              id="name"
              autoComplete="current-name"
              value={enteredName}
              onChange={(e) => {
                setEnteredName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={enteredPassword}
              onChange={(e) => {
                setEnteredPassword(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="phone"
              type="phone"
              id="phone"
              autoComplete="current-phone"
              value={enteredPhone}
              onChange={(e) => {
                setEnteredPhone(e.target.value);
              }}
            />
            <Box sx={{ justifyContent: "space-between", display: "flex" }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                className="flex jus"
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
