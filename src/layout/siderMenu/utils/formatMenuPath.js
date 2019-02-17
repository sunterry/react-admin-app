import { map } from 'lodash';

/**
 * @description 子路由拼接上父级路由的地址
 * @param data
 * @param parentPath
 * @returns {Array}
 */
const formatMenuPath = (data, parentPath = '/') => (
  map(data, (item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatMenuPath(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  })
);

export default formatMenuPath;
