import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { inputLengthClass } from '../utils/functions'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/actions/authAction'
import TextError from '../components/TextError'

const Login = () => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const history = useHistory()
	const [typePass, setTypePass] = useState(false)

	useEffect(() => {
		if (auth.token) history.push('/')
	}, [auth.token, history])

	const onSubmit = values => {
		dispatch(login(values))
	}

	const initialValues = { email: '', password: '' }

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address')
			.required('Email is required'),
		password: Yup.string().required('Password is required')
			.max(24, 'Max length password is 24'),
	});

	return (
		<div className="auth-page">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched, values }) => (
					<Form>
						<div className="bg-img login">
							<div className="content">
								<div className="image-login"></div>
								<div className="form-field">
									<div className="field">
										<span className="fas fa-envelope"></span>
										<Field maxLength="32" placeholder="Email" type="email" name="email" />
										<small style={{ transform: 'translate(-5px, -2px)' }}>
											{values.email && <span className={inputLengthClass(values.email.length, 20, null, 28)}>
												{values.email.length}/32
											</span>}
										</small>
									</div>
									<div className="wrap-error">
										{errors.email && touched.email && (
											<TextError>{errors.email}</TextError>
										)}
									</div>
								</div>

								<div className="form-field">
									<div className="field space">
										<span className="fa fa-lock"></span>
										<Field maxLength="24" className="pass-key" placeholder="Password" type={typePass ? "text" : "password"} name="password" />
										<span onClick={() => setTypePass(!typePass)} className="show text-warning">
											{values.password && (typePass ? 'Hide' : 'Show')}
										</span>
									</div>
									<div className="wrap-error">
										{errors.password && touched.password && (
											<TextError>{errors.password}</TextError>
										)}
									</div>
								</div>
								<br />
								<div className="form-field">
									<div className="field">
										<input className="submit" type="submit" value="LOGIN" />
									</div>
								</div>
								<br />
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
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Login