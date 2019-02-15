import React, { memo } from 'react';

const NormalLayout = memo((props) => (
	<div>
		{ props.children }
	</div>
));

export default NormalLayout;
