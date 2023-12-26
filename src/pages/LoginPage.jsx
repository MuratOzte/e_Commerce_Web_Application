import Login from '../components/auth/Login';

const LoginPage = () => {
    localStorage.removeItem('token');
    return <Login />;
};

export default LoginPage;
