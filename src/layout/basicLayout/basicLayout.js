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
