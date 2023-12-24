import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('murat@murat.com');
    const [enteredPassword, setEnteredPassword] = useState('2');

  const API_URL = "http://localhost:3000/auth/login";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
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
            const token = responseData.token;
            localStorage.setItem("token",token);
        } catch (error) {
            console.error('Error:', error.message);
        }
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
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                className="flex jus"
              />
              <Grid className="pt-2">
                <Grid item xs>
                  <Link to={"/resPassword"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
