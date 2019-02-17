import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Logo from '@/layout/logo';
import formatMenuPath from './utils/formatMenuPath';
import getFlatMenuKeys from './utils/getFlatMenuKeys';
import getMenuMatchKeys from './utils/getMenuMatchKeys';
import urlToList from './utils/urlToList';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fullPathMenuData = memoize(menuConfig => formatMenuPath(menuConfig));

    this.selectedKeys = memoize((pathname, fullPathMenu) => (
      getMenuMatchKeys(getFlatMenuKeys(fullPathMenu), urlToList(pathname))
    ));

    const { pathname, menuConfig } = props;

    this.state = {
      openKeys: this.selectedKeys(pathname, this.fullPathMenuData(menuConfig)),
    };

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  static defaultProps = {
    collapsed: false,
    menuConfig: [],
    pathname: '',
    appBaseUrl: '/app',
    appName: 'React Admin',
  };

  static propTypes = {
    collapsed: PropTypes.bool,
    menuConfig: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      icon: PropTypes.string,
      children: PropTypes.array,
    })),
    pathname: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    appBaseUrl: PropTypes.string,
    appName: PropTypes.string,
    appLogo: PropTypes.string
  };

  renderMenu = data => map(data, item => {
    if (item.children) return (
      <SubMenu
        key={ item.path }
        title={
          <span>
            { item.icon && <Icon type={item.icon} /> }
            <span> { item.name  } </span>
          </span>
        }
      >
        { this.renderMenu(item.children) }
      </SubMenu>
    );

    return (
      <Item key={ item.path }>
        <span>
         { item.icon && <Icon type={item.icon} /> }
          <span> { item.name  } </span>
        </span>
      </Item>
    )
  });

  handleOpenChange(openKeys) {
    this.setState({
      openKeys,
    })
  };

  handleSelect({ item, key }) {
    this.props.history.push(key);
  };

  render() {
    const { collapsed, pathname, menuConfig, appBaseUrl, appName, appLogo } = this.props;
    const { openKeys } = this.state;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Logo
          appBaseUrl={ appBaseUrl }
          appLogo={ appLogo }
          appName={ appName }
          collapsed={ collapsed }
        />
        <Menu
          style={{  width: '100%' }}
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={this.selectedKeys(pathname, this.fullPathMenuData(menuConfig))}
          onOpenChange={this.handleOpenChange}
          onSelect={ this.handleSelect }
        >
          {this.renderMenu(this.fullPathMenuData(menuConfig))}
        </Menu>
      </Sider>
    )
  }
}

export default SiderMenu;
