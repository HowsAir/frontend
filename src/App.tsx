import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from './layouts/Layout';
import Landing from './pages/home/Landing';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PaymentSuccess from './pages/shop/PaymentSuccess';
import PaymentCancel from './pages/shop/PaymentCancel';
import TermsAndPrivacy from './pages/home/TermsAndPrivacy';
import Product from './pages/shop/Product';
import Maps from './pages/home/Maps';
import FreeBreezeRequest from './pages/shop/FreeBreezeRequest';
import ForgotPassword from './pages/auth/ForgotPassword';
import { AnimatePresence } from 'framer-motion';
// import User from './pages/User';
import Admin from './pages/admin/Admin';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/auth/ChangePassword';

const App = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <Layout noPadding>
                            <Landing />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
                <Route
                    path="/user"
                    element={
                        <Layout>
                            <p>hola</p>
                            {/* <User /> */}
                        </Layout>
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <Layout>
                            <EditProfile />
                        </Layout>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <Layout>
                            <ChangePassword />
                        </Layout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Layout>
                            <Admin />
                        </Layout>
                    }
                />
                <Route
                    path="/terms-and-privacy"
                    element={
                        <Layout>
                            <TermsAndPrivacy />
                        </Layout>
                    }
                />
                <Route
                    path="/breeze"
                    element={
                        <Layout>
                            <Product />
                        </Layout>
                    }
                />
                <Route
                    path="/maps"
                    element={
                        <Layout>
                            <Maps />
                        </Layout>
                    }
                />
                <Route
                    path="/free-breeze-application"
                    element={
                        <Layout>
                            <FreeBreezeRequest />
                        </Layout>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <Layout>
                            <ForgotPassword />
                        </Layout>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    );
};
export default App;
