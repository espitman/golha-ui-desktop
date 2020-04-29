import React from 'react'

import './style.scss'

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props)
    this.userService = props.services.userService
    this.state = {
      loadingSignIn: false,
      active: 0
    }
  }

  goToTab = (active) => {
    this.setState({ active })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  signin = async (e) => {
    e.preventDefault()
    this.setState({ loadingSignIn: true })
    const { username, password } = this.state
    try {
      await this.userService.signin(username, password)
      this.setState({ loadingSignIn: false })
    } catch (error) {
      alert(error.message)
      this.setState({ loadingSignIn: false })
    }
  }

  signup = async (e) => {
    e.preventDefault()
    this.setState({ loadingSignIn: true })
    const { password, fname, lname, email, mobile } = this.state
    try {
      await this.userService.signup(password, fname, lname, email, mobile)
      this.setState({ loadingSignIn: false })
    } catch (error) {
      alert(error.message)
      this.setState({ loadingSignIn: false })
    }
  }

  render() {
    const { active, loadingSignIn } = this.state
    return (
      <div id="screen-signin">
        <div className="signin-tabs">
          <ul>
            <li
              className={active === 0 ? 'active' : ''}
              onClick={() => this.goToTab(0)}
            >
              ورود
            </li>
            <li
              className={active === 1 ? 'active' : ''}
              onClick={() => this.goToTab(1)}
            >
              ثبت‌نام
            </li>
          </ul>
        </div>
        <div className="signin-tabs-body">
          <div className={`signin-tabs-body-inner ${active === 0 && 'active'}`}>
            <form className="gForm" onSubmit={this.signin}>
              <div className="gForm-row">
                <label>ایمیل یا شماره تلفن همراه</label>
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="gForm-row">
                <label>رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="gForm-row">
                <button type="submit" className={loadingSignIn && 'loading'}>
                  {!loadingSignIn ? (
                    <>ورود</>
                  ) : (
                    <i className="fal fa-spinner-third fa-spin"></i>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className={`signin-tabs-body-inner ${active === 1 && 'active'}`}>
            <form className="gForm" onSubmit={this.signup}>
              <div className="gForm-row">
                <label>شماره تلفن همراه</label>
                <input type="text" name="mobile" onChange={this.handleChange} />
              </div>
              <div className="gForm-row">
                <label>ایمیل</label>
                <input type="email" name="email" onChange={this.handleChange} />
              </div>
              <div className="gForm-row">
                <label>رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="gForm-row">
                <label>نام</label>
                <input
                  type="text"
                  name="fname"
                  onChange={this.handleChange}
                  className="rtl"
                />
              </div>
              <div className="gForm-row">
                <label>نام خانوادگی</label>
                <input
                  type="text"
                  name="lname"
                  onChange={this.handleChange}
                  className="rtl"
                />
              </div>
              <div className="gForm-row">
                <button type="submit" className={loadingSignIn && 'loading'}>
                  {!loadingSignIn ? (
                    <>ثبت‌نام</>
                  ) : (
                    <i className="fal fa-spinner-third fa-spin"></i>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
