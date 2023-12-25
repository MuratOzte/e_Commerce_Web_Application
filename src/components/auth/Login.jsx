import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import loginSlice from '../../store/loginSlice';
import { Link } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('murat@murat.com');
    const [enteredPassword, setEnteredPassword] = useState('2');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const API_URL = 'http://localhost:3000/auth/login';

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Something Went Wrong!');
            }

            const responseData = await response.json();
            console.log(responseData);
            const token = responseData.token;
            localStorage.setItem('token', token);
            dispatch(loginSlice.actions.isLoggedInFunc());
            dispatch(loginSlice.actions.setToken(token));
            return navigate('/homepage');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={24}
                sx={{ pb: 5, pt: 1, px: 5, mt: 15, borderRadius: 7 }}
            >
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={submitHandler}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Typography
                            display={'flex'}
                            justifyContent={'center'}
                            fontSize={24}
                        >
                            Login
                        </Typography>
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
                                justifyContent: 'space-between',
                                display: 'flex',
                            }}
                        >
                            <Grid className="pt-2">
                                <Grid item xs>
                                    <Link
                                        to={'/resPassword'}
                                        variant="body2"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
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
                        <Divider
                            sx={{
                                bgcolor: '#e3e5e8',
                                px: 15,
                                py: 0.05,
                                my: 1,
                            }}
                        />
                        <Link to={'/register'}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: '#42b72a',
                                    pt: '4',
                                    mt: 1.5,
                                    ':hover': {
                                        bgcolor: '#2D8D1A',
                                    },
                                }}
                            >
                                Yeni hesap oluştur
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
