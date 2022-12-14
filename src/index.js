import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '~/components/GlobalStyles';
import { AuthenProvider } from './context/AuthenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthenProvider>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </AuthenProvider>

);
