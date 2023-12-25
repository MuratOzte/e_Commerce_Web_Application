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
import Modal from '@mui/material/Modal';
import Orders from '../orders/Orders';

const pages = ['Kiyafetler', 'Ayakkabi', 'Aksesuar', 'Spor Giyim', 'Canta'];

function ResponsiveAppBar() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const isOpenRedux = useSelector((state) => state.login.isModalOpen);

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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex' },
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
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,

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
                        <Link
                            style={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                padding: 5,
                                paddingRight: 15,
                                textDecoration: 'none',
                            }}
                            to={'/'}
                        >
                            mainpage
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
                            to={'/discountProducts'}
                        >
                            Indirimli Urunler
                        </Link>
                        {isLoggedIn && (
                            <IconButton
                                disableFocusRipple
                                disableRipple
                                disableTouchRipple
                                disabled={isOpenRedux}
                                onClick={() => {
                                    dispatch(
                                        loginSlice.actions.toggleModalOpen(true)
                                    );
                                }}
                                sx={{ color: 'white' }}
                            >
                                <ShoppingCartIcon
                                    color="inherit"
                                    fontSize="large"
                                />
                                <Orders />
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
