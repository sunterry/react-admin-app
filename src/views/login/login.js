import React from 'react';
import { loginAuth } from '@/api/user';

class Login extends React.PureComponent {
	componentDidMount() {
		loginAuth({ username: 'admin', password: 'admin' }).then(res => {
			console.log(res);
		})
	}

	render() {
		return (
			<div>Login</div>
		)
	}
}

export default Login;
