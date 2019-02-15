import { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	isLogin: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired,
};

const CheckLogin = (props) => {

	function getIsLogin(props) {
		const { isLogin, history } = props;
		if (!isLogin) history.push('/login');
	}

	useEffect(() => {
		getIsLogin(props);
	});

	return props.children;
};

CheckLogin.propTypes = propTypes;

export default CheckLogin;
