import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();