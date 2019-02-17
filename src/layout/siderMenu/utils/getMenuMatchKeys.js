import pathToRegexp from 'path-to-regexp';
import { filter, reduce } from 'lodash';

// paths ["/menu", "/menu/affix"]
// flatMenuKeys  ["/app", "/menu", "/menu/affix", "/menu/breadcrumb", "/menu/dropdown", "/data", "/data/autoComplete", "/data/checkbox", "/data/cascader"]
/**
 * @description 把路由合并到一个数组中， 并且子路由也会拼接上它的父级路由
 * @param flatMenuKeys
 * @param paths
 * @returns {*}
 */
const getMeunMatchKeys = (flatMenuKeys, paths) =>
  reduce(paths, (matchKeys, path) => (
    matchKeys.concat(filter(flatMenuKeys, item => pathToRegexp(item).test(path)))
  ), []);

export default getMeunMatchKeys;
