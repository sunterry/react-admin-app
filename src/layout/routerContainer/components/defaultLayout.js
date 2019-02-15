import React, { memo } from 'react';

const DefaultLayout = memo(props => <div>{ props.children }</div>);

export default DefaultLayout;
