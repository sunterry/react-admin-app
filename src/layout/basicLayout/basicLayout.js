import React from 'react';

class BasicLayout extends React.PureComponent {
	render() {
		return (
			<div>
				<div>basicLayout</div>
				<div> { this.props.children } </div>
			</div>
		)
	}
}

export default BasicLayout;
