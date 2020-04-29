import React from 'react'
import ReactFormInputValidation from 'react-form-input-validation'
import { toast } from 'react-toastify'

import './style.scss'

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props)
    this.userService = props.services.userService
    this.state = {
      loadingSignIn: false,
      active: 0,
      usernameField: 'mobile',
      fields: {
        email: '',
        mobile: '',
        password: ''
      },
      errors: {}
    }

    this.formSigninWithMobile = new ReactFormInputValidation(this)
    this.formSigninWithMobile.useRules({
      mobile: ['required', 'regex:/09\\d{9}$'],
      password: 'required|min:8'
    })
    this.formSigninWithMobile.onformsubmit = (fields) => {
      const { mobile, password } = fields
      const username = mobile
      this.signin({ username, password })
    }

    this.formSigninWithEmail = new ReactFormInputValidation(this)
    this.formSigninWithEmail.useRules({
      email: 'required|email',
      password: 'required|min:8'
    })
    this.formSigninWithEmail.onformsubmit = (fields) => {
      const { email, password } = fields
      const username = email
      this.signin({ username, password })
    }
  }

  goToTab = (active) => {
    this.setState({ active })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  signin = async (fields) => {
    this.setState({ loadingSignIn: true })
    const { username, password } = fields
    try {
      await this.userService.signin(username, password)
      this.setState({ loadingSignIn: false })
    } catch (error) {
      toast.error('مشخصات وارد شده صحیح نمی‌باشد.')
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

  switchUsernameField = (usernameField) => {
    this.setState({ usernameField })
  }

  render() {
    ReactFormInputValidation.useLang('fa')
    const { active, loadingSignIn, fields, errors, usernameField } = this.state
    const { formSigninWithMobile, formSigninWithEmail } = this
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
            {usernameField === 'mobile' ? (
              <form
                className="gForm"
                onSubmit={formSigninWithMobile.handleSubmit}
              >
                <div className="gForm-row">
                  <label>تلفن همراه</label>
                  <input
                    type="text"
                    name="mobile"
                    onChange={formSigninWithMobile.handleChangeEvent}
                    onBlur={formSigninWithMobile.handleBlurEvent}
                    value={fields.mobile}
                    data-attribute-name="تلفن همراه"
                    className={errors.mobile && 'error'}
                  />
                  {errors.mobile && (
                    <label className="error">{errors.mobile}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <label>رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    onBlur={formSigninWithMobile.handleBlurEvent}
                    onChange={this.formSigninWithMobile.handleChangeEvent}
                    value={fields.password}
                    data-attribute-name="رمز عبور"
                    className={errors.password && 'error'}
                  />
                  {errors.password && (
                    <label className="error">{errors.password}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <button type="submit" className={loadingSignIn && 'loading'}>
                    {!loadingSignIn ? (
                      <>ورود</>
                    ) : (
                      <i className="fal fa-spinner-third fa-spin" />
                    )}
                  </button>
                </div>
                <div className="gForm-row">
                  <button
                    type="button"
                    className="sign-with-email"
                    onClick={() => this.switchUsernameField('email')}
                  >
                    <i className="fal fa-envelope" />
                    <span>ورود با ایمیل</span>
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="gForm"
                onSubmit={formSigninWithEmail.handleSubmit}
              >
                <div className="gForm-row">
                  <label>ایمیل</label>
                  <input
                    type="text"
                    name="email"
                    onChange={formSigninWithEmail.handleChangeEvent}
                    onBlur={formSigninWithEmail.handleBlurEvent}
                    value={fields.email}
                    data-attribute-name="ایمیل"
                    className={errors.email && 'error'}
                  />
                  {errors.email && (
                    <label className="error">{errors.email}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <label>رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    onBlur={formSigninWithEmail.handleBlurEvent}
                    onChange={this.formSigninWithEmail.handleChangeEvent}
                    value={fields.password}
                    data-attribute-name="رمز عبور"
                    className={errors.password && 'error'}
                  />
                  {errors.password && (
                    <label className="error">{errors.password}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <button type="submit" className={loadingSignIn && 'loading'}>
                    {!loadingSignIn ? (
                      <>ورود</>
                    ) : (
                      <i className="fal fa-spinner-third fa-spin" />
                    )}
                  </button>
                </div>
                <div className="gForm-row">
                  <button
                    type="button"
                    className="sign-with-email"
                    onClick={() => this.switchUsernameField('mobile')}
                  >
                    <i className="fal fa-phone" />
                    <span>ورود با تلفن همراه</span>
                  </button>
                </div>
              </form>
            )}
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
