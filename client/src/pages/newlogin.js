import React from 'react'

const newlogin = () => {
    return (
        <div className="new-login">
            <div className="bg-img">
                <div className="content">
                    <header>Login Form</header>
                    <form>
                        <div className="field">
                            <span className="fa fa-user"></span>
                            <input name="email" type="text" required placeholder="Email or Phone" />
                        </div>
                        <div className="field space">
                            <span className="fa fa-lock"></span>
                            <input name="password" type="password" className="pass-key" required placeholder="Password" />
                            <span className="show">SHOW</span>
                        </div>
                        <hr />
                        <div className="field">
                            <input class="submit" type="submit" value="LOGIN" />
                        </div>
                    </form>
                    <div className="login">Or login with</div>
                    <div className="links">
                        <div className="facebook">
                            <i className="fab fa-facebook-f"><span>Facebook</span></i>
                        </div>
                        <div className="instagram">
                            <i className="fab fa-instagram"><span>Instagram</span></i>
                        </div>
                    </div>
                    <div className="signup">Don't have account? {' '}
                        <a href="/register">Signup Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default newlogin
