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
				<h3 className="mb-4 text-center text-uppercase">Social Media App</h3>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						d="exampleInputEmail1"
						aria-describedby="emailHelp"
						name="email"
						value={email}
						onChange={handleChangeInput}
					/>
					<small className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<div className="pass">
						<input
							type={typePass ? "text" : "password"}
							className="form-control"
							id="exampleInputPassword1"
							name="password"
							value={password}
							onChange={handleChangeInput}
						/>
						<small onClick={() => setTypePass(!typePass)}>
							{typePass ? 'Hide' : 'Show'}
						</small>
					</div>
				</div>
				<button disabled={email && password ? false : true} type="submit" className="btn btn-dark w-100">
					Login
				</button>
				<p className="my-2">
					You don't have an account? <Link style={{ color: "crimson" }} to="/register">Register Now</Link>
				</p>
			</form>
		</div>
	)
}

export default Login