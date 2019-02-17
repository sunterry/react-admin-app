import { head, map, filter } from 'lodash';
import { combineRoutes } from '@/router/routes';

const generateBreadCrumb = breadcrumb => {
  const homeRoute = [{ name: '首页', path: '/app', icon: 'home' }];
  const routeBreadCrumb = map(breadcrumb, item => {
    const { name, ...rest } = head(filter(combineRoutes, route => route.path === item));
    console.log(rest);
    return { name, path: item, ...rest };
  });
  return homeRoute.concat(routeBreadCrumb);
};

export default generateBreadCrumb;
