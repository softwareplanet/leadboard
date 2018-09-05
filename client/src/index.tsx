import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from 'react-modal';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

Modal.setAppElement('#root');

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
