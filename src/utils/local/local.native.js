import Cookies from 'js-cookie';
import { EXP } from './local.types';

export const setLocal = (key, val, exp = EXP) => {
  const inFifteenMinutes = new Date(new Date().getTime() + (15 * 60 * 1000));
  Cookies.set(key, val, {
    expires: exp || inFifteenMinutes,
  });
};

export const getLocal = (key) => {
  const token = Cookies.get(key);
  if (token) return token;
  return '';
};

export const removeLocal = (key) => {
  Cookies.remove(key);
};
