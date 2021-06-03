import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { inputLengthClass } from '../utils/functions'

const Login = () => {
	const { auth } = useSelector(state => state)
	const initialState = { email: '', password: '' }
	const [userData, setUserData] = useState(initialState)
	const { email, password } = userData
	const [typePass, setTypePass] = useState(false)
	const dispatch = useDispatch()
	const history = useHistory()
	console.log(password)

	useEffect(() => {
		if (auth.token) history.push('/')
	}, [auth.token, history])

	const handleChangeInput = e => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
		console.log(password)
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
							<span className="fas fa-envelope"></span>
							<input
								maxLength="32"
								placeholder="Email"
								type="email"
								name="email"
								value={email}
								onChange={handleChangeInput}
							/>
							<small style={{ transform: 'translate(-5px, -2px)' }}>
								{email && <span className={inputLengthClass(email.length, 20, 28)}>
									{email.length}/32
								</span>}
							</small>
						</div>
						<div className="field space">
							<span className="fa fa-lock"></span>
							<input
								maxLength="24"
								className="pass-key"
								placeholder="Password"
								type={typePass ? "text" : "password"}
								name="password"
								value={password}
								onChange={handleChangeInput}
							/>
							<span onClick={() => setTypePass(!typePass)} className="show text-success">
								{password && (typePass ? 'Hide' : 'Show')}
							</span>
						</div>
						<br />
						<div className="field">
							<input disabled={email && password ? false : true} className="submit" type="submit" value="LOGIN" />
						</div>
						<div className="links">
							<div className="facebook">
								<i className="fab fa-facebook-f"><span>Facebook</span></i>
							</div>
							<div className="instagram">
								<i className="fab fa-instagram"><span>Instagram</span></i>
							</div>
						</div>
						<div className="signup">
							You don't have an account? <Link className="text-warning" to="/register">Register Now</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login