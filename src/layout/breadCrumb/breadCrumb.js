import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import b from './breadCrumb.module.scss';
import generateBreadcrumb from './utils/generateBreadcrumb';

const { Item } = Breadcrumb;

const BreadCrumbs = (props) => {
  const { route: { breadcrumb } } = props;
  const breadcrumbData = generateBreadcrumb(breadcrumb);

  return (
    <Breadcrumb className={ b.beradCrumb }>
      {
        map(breadcrumbData, (item, index) => (
          index === breadcrumbData.length - 1 ?
            <Item key={ item.path }>
              { item.icon && <Icon type={ item.icon } /> }
              <span>{ item.name }</span>
            </Item>
            : <Item key={ item.path }>
              { item.icon && <Icon type={ item.icon } /> }
              <span>{ item.name }</span>
            </Item>
        ))
      }
    </Breadcrumb>
  )
};

BreadCrumbs.propTypes = {
  route: PropTypes.object.isRequired,
};

export default BreadCrumbs;
