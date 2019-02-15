import React from 'react';
import PropTypes from 'prop-types';
import AclRouter from 'react-acl-router';
import { authorizedRoutes, normalRoutes } from '@/router/routes';

export default () => {
	return (
		<div>
			<AclRouter
				authorizedRoutes={authorizedRoutes}
				normalRoutes={normalRoutes}
			/>
		</div>
	)
}
