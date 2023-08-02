import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom'
import './styles.css'
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot instead of ReactDOM.render
// root.render(<React.StrictMode><App /></React.StrictMode>);
root.render(<Provider store={store}>
        <App />
    </Provider>);