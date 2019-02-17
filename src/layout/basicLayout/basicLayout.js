import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import cloneDeep from 'clone-deep';
import menuConfig from '@/router/menuConfig';
import Sider from '@/layout/siderMenu';
import CheckLogin from '@/hoc/checkLogin';

const { Header, Content } = Layout;

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    collapsed: state.app.collapsed
  }
};

@connect(mapStateToProps, null)
class BasicLayout extends PureComponent {

  constructor(props) {
    super(props);
    this.menuConfig = cloneDeep(menuConfig);
  }

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    collapsed: PropTypes.bool.isRequired,
  };

	render() {
	  const { isLogin, history, children, collapsed, location } = this.props;
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
            <Header />
            <Content>
              { children }
            </Content>
          </Layout>
        </Layout>
			</CheckLogin>
		)
	}
}

export default BasicLayout;
