import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocal } from '@/utils/local/local.native';
import { TOKEN } from '@/utils/local/local.types';
import { login } from '@/store/reducers/user';
import l from './login.module.scss';

const { Item } = Form;

@connect(null, { login })
@Form.create({ name: 'login' })
class Login extends Component {

	static propTypes = {
		login: PropTypes.func.isRequired,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.login(values).then(res => {
					this.props.history.push('/app');
					message.success(res.message);
				}).catch(e => {
					message.error(e.message);
				})
			}
		});
	};

	componentWillMount() {
		this.getIsLogin();
	}

	componentDidUpdate() {
		this.getIsLogin();
	}

	getIsLogin() {
		const { history } = this.props;
		const token = getLocal(TOKEN);
		token && history.replace('/app');
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={ l.login }>
				<div className={ l.login__form }>
					<div className={ l.login__formLogo } >
						<img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" alt=""/>
						<span>ANT DESIGN</span>
					</div>
					<Form onSubmit={ this.handleSubmit }>
						<Item>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: '请输入用户名!' }],
							})(
								<Input
									prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> }
									placeholder="请输入用户名"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码' }],
							})(
								<Input
									prefix={ <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> }
									type="password"
									placeholder="请输入密码"
								/>
							)}
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" block>
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		);
	}
}

export default Login;
