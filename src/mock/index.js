import Mock from 'mockjs';
import login  from './user';
Mock.mock(/\/admin\/login/, 'post', login);

export default Mock;
