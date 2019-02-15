import { isEmpty, isArray, isString, isFunction, indexOf } from 'lodash';

const checkPermissions = (authorities, permissions) => {
  // 空数组时表示权限可访问
  if (isEmpty(permissions)) return true;

  // 数组权限验证
  if (isArray(authorities)) {
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  // 只传一个字符串时权限验证
  if (isString(authorities)) return indexOf(permissions, authorities) !== -1;

  // 传入一个函数时权限验证
  if (isFunction(authorities)) return authorities(permissions);

  throw new Error('不支持的类型');
};

export default checkPermissions;
