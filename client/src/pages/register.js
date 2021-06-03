import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import { inputLengthClass } from '../utils/functions'

const Register = () => {
	const { auth, alert } = useSelector(state => state)
	const history = useHistory()
	const initialState = {
		fullname: '',
		username: '',
		email: '',
		password: '',
		cf_password: '',
		gender: 'male'
	}
	const [userData, setUserData] = useState(initialState)
	const {
		fullname,
		username,
		email,
		password,
		cf_password
	} = userData
	const [typePass, setTypePass] = useState(false)
	const [typeCfPass, setTypeCfPass] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if (auth.token) history.push('/')
	}, [auth.token, history])


	const handleChangeInput = e => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(register(userData))
	}

	return (
		<div className="auth-page">
			<div className="bg-img">
				<div className="content register">
					<div className="image-login"></div>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<span className="fas fa-file-signature"></span>
							<input
								maxLength="24"
								placeholder="Name"
								type="text"
								name="fullname"
								value={fullname}
								onChange={handleChangeInput}
								style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
							/>
							<small style={{ transform: 'translate(-5px, -2px)' }}>
								{fullname && <span className={inputLengthClass(fullname.length, 12, 20)}>
									{fullname.length}/24
								</span>}
							</small>
							<small className="form-text text-danger">
								{alert.fullname ? alert.fullname : ''}
							</small>
						</div>
						<div className="field">
							<span className="fas fa-file-signature"></span>
							<input
								maxLength="16"
								placeholder="Username"
								type="text"
								name="username"
								value={username.toLowerCase().replace(/ /g, '')}
								onChange={handleChangeInput}
								style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
							/>
							<small style={{ transform: 'translate(-5px, -2px)' }}>
								{username && <span className={inputLengthClass(username.length, 9, 13)}>
									{username.length}/16
								</span>}
							</small>
							<small className="form-text text-danger">
								{alert.username ? alert.username : ''}
							</small>
						</div>
						<div className="field">
							<span className="fas fa-envelope"></span>
							<input
								maxLength="32"
								placeholder="Email"
								type="text"
								name="email"
								value={email}
								onChange={handleChangeInput}
								style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
							/>
							<small style={{ transform: 'translate(-5px, -2px)' }}>
								{email && <span className={inputLengthClass(email.length, 20, 28)}>
									{email.length}/32
								</span>}
							</small>
							<small className="form-text text-danger">
								{alert.email ? alert.email : ''}
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
							<span onClick={() => setTypePass(!typePass)} className="show text-warning">
								{password && (typePass ? 'Hide' : 'Show')}
							</span>
							<small className="form-text text-danger">
								{alert.password ? alert.password : ''}
							</small>
						</div>
						<div className="field space">
							<span className="fa fa-lock"></span>
							<input
								maxLength="24"
								className="pass-key"
								placeholder="Password Confirm"
								type={typeCfPass ? "text" : "password"}
								name="cf_password"
								value={cf_password}
								onChange={handleChangeInput}
							/>
							<span onClick={() => setTypeCfPass(!typeCfPass)} className="show text-warning">
								{cf_password && (typeCfPass ? 'Hide' : 'Show')}
							</span>
							<small className="form-text text-danger">
								{alert.cf_password ? alert.cf_password : ''}
							</small>
						</div>
						<div className="radio">
							<div className="mx-0 mb-1 row justify-content-between">
								<label htmlFor="male">
									<span>Male:</span> <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput} />
								</label>
								<label htmlFor="female">
									<span>Female:</span> <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput} />
								</label>
								<label htmlFor="other">
									<span>Other:</span> <input type="radio" id="other" name="gender" value="other" onChange={handleChangeInput} />
								</label>
							</div>
						</div>
						<hr />
						<div className="field">
							<input className="submit" type="submit" value="REGISTER" />
						</div>
						<div className="signup">
							Already have an account? <Link className="text-warning" to="/">Login Now</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register