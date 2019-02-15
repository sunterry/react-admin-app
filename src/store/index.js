import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export const history = createBrowserHistory();

const rootReducers = {
	router: connectRouter(history),
	...reducers,
};

export default function configureStore(preloadedState = {}) {
	return createStore(
		combineReducers(rootReducers),
		preloadedState,
		composeWithDevTools(applyMiddleware(routerMiddleware(history), logger, thunk)),
	);
}
