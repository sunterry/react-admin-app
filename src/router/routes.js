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

const Unauthorized = Loadable({
  loader: () => import('@/layout/unauthorized'),
  loading: Loading,
});


const authorizedRoutes = [
	{
		path: '/app',
		exact: true,
		permissions: [],
		component: Home,
    name: '首页',
	},
	{
		path: '/ui/table',
		exact: true,
		permissions: ['table'],
    unauthorized: Unauthorized,
		// redirect: '/app',
		component: Table,
		breadcrumb: ['/ui/table'],
    name: '表格',
    icon: 'tablet',
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
