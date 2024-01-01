import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

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

const ResPassword = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const API_URL = "http://localhost:3000/auth/changePasswd";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={24}
        sx={{ pb: 5, pt: 1, px: 5, mt: 4, borderRadius: 7 }}
      >
        <Box
          sx={{
            marginTop: 1,
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
            <Typography
              display={"flex"}
              justifyContent={"center"}
              fontSize={24}
            >
              Change Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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

            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
              }}
            ></Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Divider
              sx={{
                bgcolor: "#e3e5e8",
                px: 15,
                py: 0.05,
                my: 1,
              }}
            />
          </Box>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#42b72a",
                pt: "4",
                mt: 1.5,
                ":hover": {
                  bgcolor: "#2D8D1A",
                },
              }}
            >
              login page
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResPassword;
