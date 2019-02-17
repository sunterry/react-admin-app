import { reduce } from 'lodash';

/**
 * @description 递归将同父级路由放到一个数组中
 * @param menuData
 * @returns {*}
 */
const getFlatMenuKeys = menuData => (
  reduce(menuData, (keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, [])
);

export default getFlatMenuKeys;
