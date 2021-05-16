import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const EditProfile = ({ user, setOnEdit }) => {
	const initialState = {
		fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
	}
	const [userData, setUserData] = useState(initialState)
	const { fullname, mobile, address, website, story, gender } = userData
	const [avatar, setAvatar] = useState('')
	const { auth, theme } = useSelector(state => state)
	const changeAvatar = () => {

	}
	const handleInput = e => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	return (
		<div className="edit-profile">
			<button onClick={() => setOnEdit(false)} className="btn btn-danger btn-close">
				Close
			</button>
			<form>
				<div className="info-avatar">
					<img 
						src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
						alt="avatar"
						style={{ filter: theme ? 'invert(1)' : 'invert(0)'}}
					/>
					<span>
						<i className="fas fa-camera" />
						<p>Change</p>
						<input 
							type="file" 
							name="file" 
							id="file-up" 
							accept="image/*"
							onChange={changeAvatar}
						/>
					</span>
				</div>
				<div className="form-group">
					<label htmlFor="fullname">Full Name</label>
					<div className="position-relative">
						<input value={fullname} onChange={handleInput} name="fullname" type="text" className="form-control" />
						<small style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }} className="text-danger position-absolute">
							{fullname.length}/25
						</small>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="mobile">Mobile</label>
					<input value={mobile} onChange={handleInput} name="mobile" type="text" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="address">Address</label>
					<input value={address} onChange={handleInput} name="address" type="text" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="website">Website</label>
					<input value={website} onChange={handleInput} name="website" type="text" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="story">Story</label>
					<textarea cols="30" rows="4" value={story} onChange={handleInput} name="story" className="form-control" />
					<small style={{ transform: 'translate(-5px, -25px)' }} className="text-danger d-block text-right">
						{story.length}/200
					</small>
				</div>
				<label htmlFor="gender">Gender</label>
				<div className="input-group-prepend px-0 mb-4">
					<select onChange={handleInput} name="gender" id="gender" className="custom-select text-capitalize">
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				<button className="btn btn-info w-100" type="submit">Save</button>
			</form>
		</div>
	)
}

export default EditProfile