import React from 'react'
import ReactFormInputValidation from 'react-form-input-validation'
import { toast } from 'react-toastify'
import storage from '../../modules/storage'

import './style.scss'

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props)
    this.userService = props.services.userService
    this.userProvider = props.userProvider
    this.state = {
      loadingSignIn: false,
      loadingSignUp: false,
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

    this.formSignup = new ReactFormInputValidation(this)
    this.formSignup.useRules({
      mobile: ['required', 'regex:/09\\d{9}$'],
      email: 'required|email',
      password: 'required|min:8',
      fname: 'required',
      lname: 'required'
    })
    this.formSignup.onformsubmit = (fields) => {
      const { password, fname, lname, email, mobile } = fields
      this.signup({ password, fname, lname, email, mobile })
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
      const user = await this.userService.signin(username, password)
      this.userProvider.setUser(user)
      storage.set('user', user)
      this.setState({ loadingSignIn: false })
      window.history.back()
    } catch (error) {
      toast.error('مشخصات وارد شده صحیح نمی‌باشد.')
      this.setState({ loadingSignIn: false })
    }
  }

  signup = async (fields) => {
    this.setState({ loadingSignUp: true })
    const { password, fname, lname, email, mobile } = fields
    try {
      await this.userService.signup(password, fname, lname, email, mobile)
      toast.success('ثبت نام موفقیت‌آمیز بود.')
      this.setState({ loadingSignUp: false })
      this.goToTab(0)
    } catch (error) {
      toast.error('کاربر دیگری با این ایمیل یا تلفن همراه ثبت نام کرده است.')

      this.setState({ loadingSignUp: false })
    }
  }

  switchUsernameField = (usernameField) => {
    this.setState({ usernameField })
  }

  render() {
    ReactFormInputValidation.useLang('fa')
    const {
      active,
      loadingSignIn,
      loadingSignUp,
      fields,
      errors,
      usernameField
    } = this.state
    const { formSigninWithMobile, formSigninWithEmail, formSignup } = this
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
          <div
            className={`signin-tabs-body-inner ${active === 0 ? 'active' : ''}`}
          >
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
                    className={errors.mobile ? 'error' : ''}
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
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && (
                    <label className="error">{errors.password}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <button
                    type="submit"
                    className={loadingSignIn ? 'loading' : ''}
                  >
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
                    className={errors.email ? 'error' : ''}
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
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && (
                    <label className="error">{errors.password}</label>
                  )}
                </div>
                <div className="gForm-row">
                  <button
                    type="submit"
                    className={loadingSignIn ? 'loading' : ''}
                  >
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
            <form className="gForm" onSubmit={formSignup.handleSubmit}>
              <div className="gForm-row">
                <label>تلفن همراه</label>
                <input
                  type="text"
                  name="mobile"
                  onChange={formSignup.handleChangeEvent}
                  onBlur={formSignup.handleBlurEvent}
                  value={fields.mobile}
                  data-attribute-name="تلفن همراه"
                  className={errors.mobile ? 'error' : ''}
                />
                {errors.mobile && (
                  <label className="error">{errors.mobile}</label>
                )}
              </div>
              <div className="gForm-row">
                <label>ایمیل</label>
                <input
                  type="text"
                  name="email"
                  onChange={formSignup.handleChangeEvent}
                  onBlur={formSignup.handleBlurEvent}
                  value={fields.email}
                  data-attribute-name="ایمیل"
                  className={errors.email ? 'error' : ''}
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
                  onBlur={formSignup.handleBlurEvent}
                  onChange={this.formSignup.handleChangeEvent}
                  value={fields.password}
                  data-attribute-name="رمز عبور"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && (
                  <label className="error">{errors.password}</label>
                )}
              </div>
              <div className="gForm-row">
                <label>نام</label>
                <input
                  type="text"
                  name="fname"
                  onChange={formSignup.handleChangeEvent}
                  onBlur={formSignup.handleBlurEvent}
                  value={fields.fname}
                  data-attribute-name="نام"
                  className={`rtl ${errors.fname ? 'error' : ''}`}
                />
                {errors.fname && (
                  <label className="error">{errors.fname}</label>
                )}
              </div>
              <div className="gForm-row">
                <label>نام خانوادگی</label>
                <input
                  type="text"
                  name="lname"
                  onChange={formSignup.handleChangeEvent}
                  onBlur={formSignup.handleBlurEvent}
                  value={fields.lname}
                  data-attribute-name="نام خانوادگی"
                  className={`rtl ${errors.lname ? 'error' : ''}`}
                />
                {errors.lname && (
                  <label className="error">{errors.lname}</label>
                )}
              </div>
              <div className="gForm-row">
                <button
                  type="submit"
                  className={loadingSignUp ? 'loading' : ''}
                >
                  {!loadingSignUp ? (
                    <>ثبت نام</>
                  ) : (
                    <i className="fal fa-spinner-third fa-spin" />
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
