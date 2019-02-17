import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout } from 'antd';
import header from './header.module.scss';

const Header = (props) => {
  const { iconType, toggle, styles } = props;
  return (
    <Layout.Header style={ styles }>
      <Icon
        className={ header.trigger }
        type={ iconType }
        onClick={ toggle }
      />
    </Layout.Header>
  )
};

Header.propTypes = {
  iconType: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

Header.defaultProps = {
  styles: { background: '#fff', padding: 0 }
};

export default React.memo(Header);
