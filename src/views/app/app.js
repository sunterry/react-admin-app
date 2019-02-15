import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '@/store';
import Container from '@/layout/container';
import initClient from './initClient';
const store = configureStore();

initClient(store.dispatch);

const App = () => (
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<Container />
		</ConnectedRouter>
	</Provider>
);

export default App;
