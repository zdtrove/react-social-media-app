import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
	const { auth } = useSelector(state => state)
	const initialState = { email: '', password: '' }
	const [userData, setUserData] = useState(initialState)
	const { email, password } = userData
	const [typePass, setTypePass] = useState(false)
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		if (auth.token) history.push('/')
	}, [auth.token, history])

	const handleChangeInput = e => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(login(userData))
	}

	return (
		<div className="auth-page">
			<form onSubmit={handleSubmit}>
				<div className="bg-img">
					<div className="content">
						<div className="image-login"></div>
						<div className="field">
							<span className="fa fa-user"></span>
							<input
								required
								placeholder="Email"
								type="email"
								name="email"
								value={email}
								onChange={handleChangeInput}
							/>
						</div>
						<div className="field space">
							<span className="fa fa-lock"></span>
							<input
								className="pass-key"
								required
								placeholder="Password"
								type={typePass ? "text" : "password"}
								name="password"
								value={password}
								onChange={handleChangeInput}
							/>
							<span onClick={() => setTypePass(!typePass)} className="show">
								{typePass ? 'Hide' : 'Show'}
							</span>
						</div>
						<hr />
						<div className="field">
							<input disabled={email && password ? false : true} className="submit" type="submit" value="LOGIN" />
						</div>
						<div className="login">Or login with</div>
						<div className="links">
							<div className="facebook">
								<i className="fab fa-facebook-f"><span>Facebook</span></i>
							</div>
							<div className="instagram">
								<i className="fab fa-instagram"><span>Instagram</span></i>
							</div>
						</div>
						<div className="signup">
							You don't have an account? <Link style={{ color: "crimson" }} to="/register">Register Now</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login