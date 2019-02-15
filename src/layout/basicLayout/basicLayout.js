import React, { PureComponent } from 'react';
import CheckLogin from './../../hoc/checkLogin';

class BasicLayout extends PureComponent {
	render() {
		return (
			<CheckLogin isLogin={ true } history={ this.props.history }>
				<div>basicLayout</div>
				<div> { this.props.children } </div>
			</CheckLogin>
		)
	}
}

export default BasicLayout;
