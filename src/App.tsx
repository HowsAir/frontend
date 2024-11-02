import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import TermsAndPrivacy from './pages/TermsAndPrivacy';
import Product from './pages/Product';
import Maps from './pages/Maps';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
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
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
