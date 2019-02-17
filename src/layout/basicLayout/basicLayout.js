import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import cloneDeep from 'clone-deep';
import { get, head } from 'lodash';
import { matchRoutes } from 'react-router-config';
import { combineRoutes } from '@/router/routes';
import menuConfig from '@/router/menuConfig';
import Sider from '@/layout/siderMenu';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import BreadCrumb from '@/layout/breadCrumb';
import CheckLogin from '@/hoc/checkLogin';
import { setCollapsed } from '@/store/reducers/app';
import b from './basicLayout.module.scss';

const { Content } = Layout;

const mapStateToProps = state => {
  const pathname = get(state, 'router.location.pathname', '');
  const { route } = head((matchRoutes(combineRoutes, pathname)));
  return {
    isLogin: state.user.isLogin,
    collapsed: state.app.collapsed,
    route,
  }
};

@connect(mapStateToProps, { setCollapsed })
class BasicLayout extends PureComponent {

  constructor(props) {
    super(props);
    this.menuConfig = cloneDeep(menuConfig);
    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    collapsed: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
  };

  toggle() {
    this.props.setCollapsed(!this.props.collapsed);
  };

	render() {
	  const { isLogin, history, children, collapsed, location, route } = this.props;
    const iconType = collapsed ? 'menu-unfold' : 'menu-fold';
		return (
			<CheckLogin
        style={{ height: '100%' }}
        isLogin={ isLogin }
        history={ history }
      >
        <Layout>
          <Sider
            history={ history }
            collapsed={ collapsed }
            menuConfig={ this.menuConfig }
            pathname={ location.pathname }
            appName="React Admin"
            appLogo="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
          />
          <Layout>
            <Header
              toggle={ this.toggle }
              iconType= { iconType }
            />
            <Content style={{ margin: '0px 16px' }}>
              <BreadCrumb route={route}/>
              <div className={ b.content } >
                { children }
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
			</CheckLogin>
		)
	}
}

export default BasicLayout;
