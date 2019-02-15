import React from 'react';
import RouterContainer from '@/layout/routerContainer'
import { authorizedRoutes, normalRoutes } from '@/router/routes';
import BasicLayout from '@/layout/basicLayout';
import NormalLayout from '@/layout/normalLayout';
import NotFound from '@/layout/notFound';

export default () => {
	return (
		<RouterContainer
			authorizedRoutes={ authorizedRoutes }
			normalRoutes={ normalRoutes }
			authorizedLayout={ BasicLayout }
			normalLayout={ NormalLayout }
			notFound={ NotFound }
		/>
	)
}
