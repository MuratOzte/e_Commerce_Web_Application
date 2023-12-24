import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = ['Kiyafetler', 'Ayakkabi', 'Aksesuar', 'Spor Giyim', 'Canta'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
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
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
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
                    <IconButton sx={{ color: 'white' }}>
                        <ShoppingCartIcon color="inherit" fontSize="large" />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
