import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { map, isNil } from 'lodash';
import DefaultNotFound from './components/defaultNotFound';
import DefaultLayout from './components/defaultLayout';
import omitRouteRenderProperties from './utils/omitRouteRenderProperties';
import checkPermissions from './utils/checkPermissions';


class RouterContainer extends Component {

	constructor(props) {
		super(props);
		this.renderRedirectRoute = this.renderRedirectRoute.bind(this);
		this.renderUnAuthorizedRoute = this.renderUnAuthorizedRoute.bind(this);
		this.renderNotFoundRoute = this.renderNotFoundRoute.bind(this);
		this.renderAuthorizedRoute = this.renderAuthorizedRoute.bind(this);
	};

	static defaultProps = {
		authorities: '',
		normalRoutes: [],
		normalLayout: DefaultLayout,
		authorizedLayout: DefaultLayout,
		authorizedRoutes: [],
		notFound: DefaultNotFound,
	};

	static propTypes = {
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
		authorizedRoutes: PropTypes.arrayOf(PropTypes.shape({
			path: PropTypes.string,
			permission: PropTypes.arrayOf(PropTypes.string),
			component: PropTypes.func,
			redirect: PropTypes.string,
			unauthorized: PropTypes.func,
		})),
		normalLayout: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object,
		]),
		authorizedLayout: PropTypes.func,
		notFound: PropTypes.func,
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

export default RouterContainer;
