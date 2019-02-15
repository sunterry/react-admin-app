import Loadable from 'react-loadable';
import Loading from '@/components/loading';

const Login = Loadable({
	loader: () => import('@/views/login/login'),
	loading: Loading,
});

const Home = Loadable({
	loader: () => import('@/views/home/home'),
	loading: Loading,
});

const Table = Loadable({
	loader: () => import('@/views/ui/table/table'),
	loading: Loading,
});


const authorizedRoutes = [
	{
		path: '/app',
		exact: true,
		permissions: [],
		component: Home,
		breadcrumb: ['/app'],
	},
	{
		path: '/ui/table',
		exact: true,
		permissions: [],
		redirect: '/login',
		component: Table,
		breadcrumb: ['/app', '/ui', '/ui/table']
	},
];

const normalRoutes = [
	{
		path: '/',
		exact: true,
		redirect: '/app',
	},
	{
		path: '/login',
		exact: true,
		component: Login,
	}
];


const combineRoutes = [
	...authorizedRoutes,
	...normalRoutes,
];

export {
	authorizedRoutes,
	normalRoutes,
	combineRoutes,
};
