import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RouterContainer from '@/layout/routerContainer'
import { authorizedRoutes, normalRoutes } from '@/router/routes';
import BasicLayout from '@/layout/basicLayout';
import NormalLayout from '@/layout/normalLayout';
import NotFound from '@/layout/notFound';

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const Container = (props) => {
  const { user } = props;
	return (
		<RouterContainer
      authorities={ user.auth }
			authorizedRoutes={ authorizedRoutes }
			normalRoutes={ normalRoutes }
			authorizedLayout={ BasicLayout }
			normalLayout={ NormalLayout }
			notFound={ NotFound }
		/>
	)
};

Container.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Container);
