import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import CheckLogin from '@/hoc/checkLogin';

const { Header, Sider, Content } = Layout;

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
  }
};

@connect(mapStateToProps, null)
class BasicLayout extends PureComponent {

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
  };

	render() {
	  const { isLogin, history, children } = this.props;
		return (
			<CheckLogin
        style={{ height: '100%' }}
        isLogin={ isLogin }
        history={ history }
      >
        <Layout>
          <Sider />
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
