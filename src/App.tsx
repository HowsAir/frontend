import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthRedirect } from './components/auth/AuthRedirect';
import { ProtectedRoute } from './components/auth/ProtectedRoutes';
import Layout from './layouts/Layout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMaps from './pages/admin/AdminMaps';
import ChangePassword from './pages/auth/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FreeBreezeRequest from './pages/shop/FreeBreezeRequest';
import PaymentCancel from './pages/shop/PaymentCancel';
import PaymentSuccess from './pages/shop/PaymentSuccess';
import Product from './pages/shop/Product';
import EditProfile from './pages/user/EditProfile';
import Node from './pages/user/Node';
import Portal from './pages/user/Portal';
import Start from './pages/user/Portal';
import Landing from './pages/home/Landing';
import Maps from './pages/home/Maps';
import TermsAndPrivacy from './pages/home/TermsAndPrivacy';

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
                            {/* <ProtectedRoute allowedRoles={[1, 2]}> */}
                            <ChangePassword />
                            {/* </ProtectedRoute> */}
                        </Layout>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[2]}>
                                <AdminUsers />
                            </ProtectedRoute>
                        </Layout>
                    }
                />
                <Route
                    path="/admin/maps"
                    element={
                        <Layout>
                            <ProtectedRoute allowedRoles={[2]}>
                                <AdminMaps />
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
