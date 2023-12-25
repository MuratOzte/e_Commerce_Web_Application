import { Outlet } from 'react-router-dom';
import MainNav from '../components/Layout/MainNav';
import { useSelector } from 'react-redux';
import ProductComments from '../components/products/ProductsComment';

const Layout = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    return (
        <>
            {isLoggedIn && <MainNav />}
            {isCommentModalOpen && <ProductComments />}
            <Outlet />
        </>
    );
};

export default Layout;
