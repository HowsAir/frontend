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
import Portal from './pages/user/Portal';
import Node from './pages/user/Node';
import Admin from './pages/admin/Admin';
import ChangePassword from './pages/auth/ChangePassword';
import EditProfile from './pages/user/EditProfile';
import { ProtectedRoute } from './components/ProtectedRoutes';
import Start from './pages/user/Portal';
import { AuthRedirect } from './components/AuthRedirect';

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
                            <AuthRedirect>
                                <Register />
                            </AuthRedirect>
                        </Layout>
                    }
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <AuthRedirect>
                                <Login />
                            </AuthRedirect>
                        </Layout>
                    }
                />
                <Route
                    path="/portal"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[1]}>
                                <Portal />
                            </ProtectedRoute>
                        </Layout>
                    }
                />
                <Route
                    path="/node"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[1]}>
                                <Node />
                            </ProtectedRoute>
                        </Layout>
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[1, 2]}>
                                <EditProfile />
                            </ProtectedRoute>
                        </Layout>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[1, 2]}>
                                <ChangePassword />
                            </ProtectedRoute>
                        </Layout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[2]}>
                                <Admin />
                            </ProtectedRoute>
                        </Layout>
                    }
                />

                <Route
                    path="/start"
                    element={
                        <Layout>
                            <Start />
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
                            <AuthRedirect>
                                <FreeBreezeRequest />
                            </AuthRedirect>
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
                <Route
                    path="/terms-and-privacy"
                    element={
                        <Layout>
                            <TermsAndPrivacy />
                        </Layout>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    );
};
export default App;
