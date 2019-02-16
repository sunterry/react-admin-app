import { getLocal } from '@/utils/local/local.native';
import { loginCreater } from '@/store/reducers/user'

const initClient = (dispatch) => {
	const isLogin = getLocal('token');
	if (isLogin) {
		const getLocalUser = localStorage.getItem('user');
		const user = (getLocalUser && JSON.parse(getLocalUser)) || [];
		const getLocalAuth = localStorage.getItem('auth');
		const auth = (getLocalAuth && JSON.parse(getLocalAuth)) || [];
		const info = {user: user, auth};
		dispatch(loginCreater({ isLogin: true, ...info, token: getLocal('token') }));
	} else {
		dispatch(loginCreater({ isLogin: false }));
	}
};

export default initClient;
