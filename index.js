import React from 'react';
import { render } from 'react-dom';
import App from './src/App';
import { StateProvider } from './src/store/store';


render(
    <StateProvider>
        <App />
    </StateProvider>,
    document.getElementById('root'),
);
