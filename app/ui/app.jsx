import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Context from './context.jsx';
import { NotesProvider } from './notes-provider.jsx';

import { AppContainer } from 'react-hot-loader';

const App = () => (
    <NotesProvider>
        <Context />
    </NotesProvider>
)

const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('pp-worknotes')
    );
}

renderApp();

(module.hot) && module.hot.accept();