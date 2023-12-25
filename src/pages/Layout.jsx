import { Outlet } from 'react-router-dom';
import MainNav from '../components/Layout/MainNav';
import { useSelector } from 'react-redux';

const Layout = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    return (
        <>
            {isLoggedIn && <MainNav />}
            <Outlet />
        </>
    );
};

export default Layout;
