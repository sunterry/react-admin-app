import { omit } from 'lodash';

const OMIT_ROUTE_RENDER_PROPERTIES = ['render', 'component'];

/**
 * @description 筛选当前路由对象的部分key和value值
 * @param route
 * @return arrar => ![ render, component ]
 */

const omitRouteRenderProperties = route => omit(route, OMIT_ROUTE_RENDER_PROPERTIES);

export default omitRouteRenderProperties;
