import axios from '@/axios/index.js';

export const loginAuth = params => axios.request({
	url: '/admin/login',
	method: 'post',
	data: params,
});
