import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.module.scss';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  const { appBaseUrl, appLogo, appName, collapsed } = props;
  return (
    <Link to={ appBaseUrl }>
      <div className={ logo.container }>
        <img className={ logo.logo } src={ appLogo } alt={ appName }/>
        { collapsed ? null : <div className={ logo.title }> { appName } </div> }
      </div>
    </Link>
  )
};

Logo.propTypes = {
  appBaseUrl: PropTypes.string,
  appLogo: PropTypes.string,
  appName: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
};

Logo.defaultProps = {
  appBaseUrl: '/',
  appLogo: '',
  appName: 'React-Admin',
};

export default Logo;
