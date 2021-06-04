import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import { inputLengthClass } from '../utils/functions'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextError from '../components/TextError'

const Register = () => {
	const { auth } = useSelector(state => state)
	const history = useHistory()
	const [typePass, setTypePass] = useState(false)
	const [typeCfPass, setTypeCfPass] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if (auth.token) history.push('/')
	}, [auth.token, history])

	const initialValues = {
		fullname: '',
		username: '',
		email: '',
		password: '',
		cf_password: '',
		gender: 'other'
	}

	const validationSchema = Yup.object().shape({
		fullname: Yup.string().required('Fullname is required')
			.min(6, 'Min length fullname is 6')
			.max(24, 'Max length fullname is 24'),
		username: Yup.string().required('Username is required')
			.min(6, 'Min length username is 6')
			.max(16, 'Max length username is 16'),
		email: Yup.string().email('Invalid email address')
			.required('Email is required')
			.max(32, 'Max length email is 32'),
		password: Yup.string().required('Password is required')
			.min(6, 'Min length password is 6')
			.max(24, 'Max length password is 24'),
		cf_password: Yup.string().required('Confirm password is required')
			.min(6, 'Min length password confirm is 6')
			.max(24, 'Max length password confirm is 24')
			.oneOf([Yup.ref('password'), null], 'Passwords not matched'),
		gender: Yup.string().required('Gender is required')
	});

	const onSubmit = values => {
		dispatch(register(values))
	}

	return (
		<div className="auth-page">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched, values }) => (
					<Form>
						<div className="bg-img register">
							<div className="content">
								<div className="image-login"></div>
								<div className="form-field">
									<div className="field">
										<span className="fas fa-file-signature"></span>
										<Field maxLength="24" placeholder="Name" type="text" name="fullname" />
										<small style={{ transform: 'translate(-5px, -2px)' }}>
											{values.fullname && <span className={inputLengthClass(values.fullname.length, 12, 20)}>
												{values.fullname.length}/24
											</span>}
										</small>
									</div>
									<div className="wrap-error">
										{errors.fullname && touched.fullname && (
											<TextError>{errors.fullname}</TextError>
										)}
									</div>
								</div>
								<div className="form-field">
									<div className="field">
										<span className="fas fa-file-signature"></span>
										<Field maxLength="16" placeholder="Username" type="text" name="username" />
										<small style={{ transform: 'translate(-5px, -2px)' }}>
											{values.username && <span className={inputLengthClass(values.username.length, 9, 13)}>
												{values.username.length}/16
											</span>}
										</small>
									</div>
									<div className="wrap-error">
										{errors.username && touched.username && (
											<TextError>{errors.username}</TextError>
										)}
									</div>
								</div>
								<div className="form-field">
									<div className="field">
										<span className="fas fa-envelope"></span>
										<Field maxLength="32" placeholder="Email" type="email" name="email" />
										<small style={{ transform: 'translate(-5px, -2px)' }}>
											{values.email && <span className={inputLengthClass(values.email.length, 20, 28)}>
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
								<div className="form-field">
									<div className="field space">
										<span className="fa fa-lock"></span>
										<Field maxLength="24" className="pass-key" placeholder="Password Confirm" type={typeCfPass ? "text" : "password"} name="cf_password" />
										<span onClick={() => setTypeCfPass(!typeCfPass)} className="show text-warning">
											{values.cf_password && (typeCfPass ? 'Hide' : 'Show')}
										</span>
									</div>
									<div className="wrap-error">
										{errors.cf_password && touched.cf_password && (
											<TextError>{errors.cf_password}</TextError>
										)}
									</div>
								</div>
								<div className="radio">
									<div className="mx-0 mb-1 row justify-content-between">
										<label htmlFor="male">
											<span>Male:</span> <Field type="radio" id="male" name="gender" value="male" />
										</label>
										<label htmlFor="female">
											<span>Female:</span> <Field type="radio" id="female" name="gender" value="female" />
										</label>
										<label htmlFor="other">
											<span>Other:</span> <Field type="radio" id="other" name="gender" value="other" />
										</label>
									</div>
								</div>
								<div className="form-field">
									<div className="field">
										<input className="submit" type="submit" value="REGISTER" />
									</div>
								</div>
								<br />
								<div className="signup">
									Already have an account? <Link className="text-warning" to="/">Login Now</Link>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Register