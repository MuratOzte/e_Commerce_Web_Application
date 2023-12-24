import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import loginSlice from '../../store/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const pages = ['Kiyafetler', 'Ayakkabi', 'Aksesuar', 'Spor Giyim', 'Canta'];

function ResponsiveAppBar() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitBtnHandler = () => {
        localStorage.removeItem('token');
        dispatch(loginSlice.actions.isLoggedInFunc());
        return navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#607274' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <AdbIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            mx: 50,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'products/1'}
                        >
                            {pages[0]}
                        </Link>
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'products/2'}
                        >
                            {pages[1]}
                        </Link>
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'products/3'}
                        >
                            {pages[2]}
                        </Link>
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'products/4'}
                        >
                            {pages[3]}
                        </Link>
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'products/5'}
                        >
                            {pages[4]}
                        </Link>
                    </Box>
                    {isLoggedIn && (
                        <IconButton sx={{ color: 'white' }}>
                            <ShoppingCartIcon
                                color="inherit"
                                fontSize="large"
                            />
                        </IconButton>
                    )}
                    {isLoggedIn && (
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={exitBtnHandler}
                        >
                            <ExitToApp color="inherit" fontSize="large" />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
