import React from 'react';
import { Layout } from 'antd';
import f from './footer.module.scss';

const { Footer } = Layout;

export default React.memo((props) => (
  <Footer className={ f.footer }>
    { props.children || 'Ant Design ©2018 Created by 15253130515@163.com' }
  </Footer>
));
