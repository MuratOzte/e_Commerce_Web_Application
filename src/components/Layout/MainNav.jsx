import { ExitToApp } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginSlice from '../../store/loginSlice';
import Orders from '../orders/Orders';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
const pages = ['Kiyafetler', 'Ayakkabi', 'Aksesuar', 'Spor Giyim', 'Canta'];

function ResponsiveAppBar() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const isOpenRedux = useSelector((state) => state.login.isModalOpen);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitBtnHandler = () => {
        localStorage.removeItem('token');
        dispatch(loginSlice.actions.isLoggedInFunc());
        dispatch(loginSlice.actions.setCustomerId(null));
        return navigate('/');
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [isMostLikedModalOpen, setIsMostLikedModalOpen] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const allCommentsHandler = () => {
        navigate('/userComments');
        setAnchorEl(null);
    };

    const shoppingCartIconHandler = async () => {
        dispatch(loginSlice.actions.toggleModalOpen(true));
    };

    const modalCloseHandler = () => {
        setIsMostLikedModalOpen(false);
    };

    return (
        <>
            {isLoggedIn && (
                <AppBar position="static" sx={{ backgroundColor: '#607274' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link
                                    to={'/homepage'}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="a"
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
                                        E-Commerce
                                    </Typography>
                                </Link>
                                <Box display={'flex'} flexDirection={'row'}>
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
                                        to={'/discountProducts'}
                                    >
                                        Indirimli Urunler
                                    </Link>
                                </Box>

                                <Box display={'flex'}>
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <AccountCircle fontSize="large" />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    setIsMostLikedModalOpen(
                                                        (prev) => !prev
                                                    );
                                                }}
                                            >
                                                En Çok Beğeni Alan Yorum
                                            </MenuItem>
                                            <MenuItem
                                                onClick={allCommentsHandler}
                                            >
                                                Tüm Yorumlarım
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    {isLoggedIn && (
                                        <IconButton
                                            disabled={isOpenRedux}
                                            onClick={shoppingCartIconHandler}
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
                                            <ExitToApp
                                                color="inherit"
                                                fontSize="large"
                                            />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}
        </>
    );
}
export default ResponsiveAppBar;
