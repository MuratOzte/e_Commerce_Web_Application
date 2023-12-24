import { Outlet } from 'react-router-dom';
import MainNav from '../components/Layout/MainNav';

const Layout = () => {
    return (
        <>
            <MainNav />
            <Outlet />
        </>
    );
};

export default Layout;
