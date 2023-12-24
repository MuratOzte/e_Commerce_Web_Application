import { Grid, Box, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

const MainNav = () => {
    return (
        <>
            <AppBar
                sx={{
                    display: 'flex',
                    background: 'red',
                    maxWidth: '50%',
                    boxShadow: 5,
                }}
            >
                <Grid container>
                    <Grid item sx={{ ml: '5%' }}>
                        <img
                            style={{ width: '50%' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT52oucabvszzOFqvBKnIECmrhpsJaNxUlEpw&usqp=CAU"
                        />
                    </Grid>
                </Grid>
            </AppBar>
        </>
    );
};

const AppBarSx = {};

export default MainNav;
