import { map } from 'lodash';

// slice 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
// data/autoComplete => ['/data', '/data/autoComplete']
/**
 * @description 把地址编程递归数组  ['/data', '/data/autoComplete']
 * @param url
 * @returns {Array}
 */
const urlToList = (url) => {
  if (url) {
    const urlList = url.split('/').filter(i => i);
    return map(urlList, (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
  }
  return [];
};

export default urlToList;
