import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './contexts/AppContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppContextProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </UserProvider>
                </AppContextProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
