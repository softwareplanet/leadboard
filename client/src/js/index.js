import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './state';

import Dashboard from './components/Dashboard';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
		  	<Dashboard />
			</Provider>
		);
	}
}

render(<App/>, document.getElementById('app'));
