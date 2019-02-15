const login = (options) => {
	const { body } = options;
	const res = JSON.parse(body);
	let response = null;
	if (res.username === 'admin' && res.password === 'admin') {
		response = {
			code: 1000,
			message: '登录成功',
			data: {
				token: 'app-admin',
				user: {
					username: 'admin',
					avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
				},
				auth: ['app', 'ui', 'table', 'affix'],
			},
		};
	} else {
		response = {
			code: 401,
			message: '登录失败',
			data: {},
		};
	}
	return response;
};

export default login;
