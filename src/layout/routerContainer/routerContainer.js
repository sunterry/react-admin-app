import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { map, isNil } from 'lodash';
import Loadable from 'react-loadable';
import Loading from '@/components/loading';
import omitRouteRenderProperties from './utils/omitRouteRenderProperties';
import checkPermissions from './utils/checkPermissions';

const DefaultLayout = Loadable({
	loader: () => import('./components/defaultLayout'),
	loading: Loading,
});

const DefaultNotFound = Loadable({
	loader: () => import('./components/defaultNotFound'),
	loading: Loading,
});

const propTypes = {
	authorities: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.func,
	]),
	normalRoutes: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string,
		redirect: PropTypes.string,
		component: PropTypes.func,
	})),
	normalLayout: PropTypes.func,
	authorizedRoutes: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string(),
		permission: PropTypes.arrayOf(PropTypes.string),
		component: PropTypes.func,
		redirect: PropTypes.string,
		unauthorized: PropTypes.func,
	})),
	authorizedLayout: PropTypes.func,
	notFound: PropTypes.func,
};

const defaultProps = {
	authorities: '',
	normalRoutes: [],
	normalLayout: DefaultLayout,
	authorizedLayout: DefaultLayout,
	authorizedRoutes: [],
	notFound: DefaultNotFound,
};


class RouterContainer extends React.Component {

	constructor(props) {
		super(props);
		this.renderRedirectRoute = this.renderRedirectRoute.bind(this);
		this.renderUnAuthorizedRoute = this.renderUnAuthorizedRoute.bind(this);
		this.renderNotFoundRoute = this.renderNotFoundRoute.bind(this);
		this.renderAuthorizedRoute = this.renderAuthorizedRoute.bind(this);
	};

	/**
	 * @description 需要redirect 的路由
	 * @param route
	 * @returns {*}
	 */
	renderRedirectRoute(route) {
		return (
			<Route
				key={ route.path }
				{ ...omitRouteRenderProperties(route) }
				render = { () => <Redirect to={ route.redirect } /> }
			/>
		)
	};

	/**
	 * @description 不需要权限的路由
 	 * @param route
	 * @returns {*}
	 */
	renderUnAuthorizedRoute(route) {
		const { normalLayout: NormalLayout } = this.props;
		const { redirect, path, component: RouteComponent } = route;

		if (isNil(RouteComponent) && !isNil(redirect)) return this.renderRedirectRoute(route);
		return (
			<Route
				key={ path }
				{ ...omitRouteRenderProperties(route) }
				render = { props => (
					<NormalLayout { ...props }>
						<RouteComponent { ...props } />
					</NormalLayout>
				)}
			/>
		)
	};

	/**
	 * @description 没有找到的路由
 	 * @returns {*}
	 */
	 renderNotFoundRoute() {
	 	 const { notFound: NotFound } = this.props;
	 	 return <Route render = { props => <NotFound { ...props } /> } />
	 };

	renderAuthorizedRoute(route) {
		const { authorizedLayout: AuthorizedLayout, authorities } = this.props;
		const {	permissions, path, component: RouteComponent,	unauthorized: Unauthorized } = route;
		const hasPermission = checkPermissions(authorities, permissions);
		if (!hasPermission && route.unauthorized) {
			return (
				<Route
					key={path}
					{ ...omitRouteRenderProperties(route) }
					render={props => (
						<AuthorizedLayout {...props}>
							<Unauthorized {...props} />
						</AuthorizedLayout>
					)}
				/>
			);
		}
		if (!hasPermission && route.redirect) return this.renderRedirectRoute(route);
		return (
			<Route
				key={path}
				{ ...omitRouteRenderProperties(route) }
				render={props => (
					<AuthorizedLayout {...props}>
						<RouteComponent {...props} />
					</AuthorizedLayout>
				)}
			/>
		)
	};


	render() {
		const { normalRoutes, authorizedRoutes } = this.props;
		return (
			<Switch>
				{
					map(normalRoutes, route => this.renderUnAuthorizedRoute(route))
				}
				{
					map(authorizedRoutes, route => this.renderAuthorizedRoute(route))
				}
				{
					this.renderNotFoundRoute()
				}
			</Switch>
		)
	}
}

RouterContainer.propsTypes = propTypes;
RouterContainer.defaultProps = defaultProps;

export default RouterContainer;
