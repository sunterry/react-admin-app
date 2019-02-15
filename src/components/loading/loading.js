import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import loading from './loading.module.scss';

const Loading = (props) => {
	const { size, delay, indicator, spinning, tip, children, wrapperClassName } = props;
	return (
		<div className={loading.loading}>
			<Spin
				size={ size }
				delay={ delay }
				indicator={ indicator }
				spinning={ spinning }
				tip = { tip }
				wrapperClassName={ wrapperClassName }
			>
				{ children }
			</Spin>
		</div>
	)
};

	Loading.propTypes = {
		size: PropTypes.oneOf(['large', 'small', 'default']),
		delay: PropTypes.number,
		indicator: PropTypes.element,
		spinning: PropTypes.bool,
		tip: PropTypes.string,
		wrapperClassName: PropTypes.string,
	};

	Loading.defaultProps = {
		size: 'default',
		spinning: true,
	};

export default Loading;
