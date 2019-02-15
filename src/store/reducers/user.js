import { loginAuth } from '@/api/user';
import { setLocal } from '../../utils/local/local.native';
import { TOKEN } from '../../utils/local/local.types';

const initState = {
	token: '',
	user: {},
	auth: [],
};

const LOGIN = 'LOGIN';

export default function (state = initState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN:
			return { ...state, isLogin: true, ...payload };
		default:
			return state;
	}
};



export const loginCreater = (data) => {
	return { type: LOGIN, payload: { ...data }}
};


export const login = (data) => {
	return dispatch => new Promise((resolve, reject) => {
		loginAuth(data).then(res => {
			if (res.data) {
				const { token, user, auth } = res.data;
				setLocal(TOKEN, token);
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('auth', JSON.stringify(auth));
				dispatch(loginCreater({ isLogin: true, ...res.data }));
				resolve(res);
			} else {
				dispatch(loginCreater({ message: res.message, isLogin: false }));
				reject({ message: res.message });
			}
		}).catch(e => {
			reject({ message: e.message });
		})
	});
};
