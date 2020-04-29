import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'
import storage from '../../modules/storage'

export default class Side extends React.Component {
  signout = () => {
    this.props.userProvider.setUser({})
    storage.remove('user')
  }

  render() {
    const { user } = this.props
    return (
      <>
        <div id="side">
          <div id="side-menu-library">
            <h5>کتابخانه</h5>
            <ul>
              <li>
                <Link to="/" id="homeLink">
                  <i className="fal fa-home" />
                  <span>صفحه اصلی</span>
                </Link>
              </li>
              <li>
                <Link to="/programs">
                  <i className="fal fa-music" />
                  <span>برنامه‌ها</span>
                </Link>
              </li>
              <li>
                <Link to="/artists">
                  <i className="fal fa-microphone-stand" />
                  <span>هنرمندان</span>
                </Link>
              </li>
              <li>
                <Link to="/archive">
                  <i className="fal fa-album-collection" />
                  <span>آرشیو من</span>
                </Link>
              </li>
            </ul>
          </div>

          <div id="side-menu-app">
            <h5>اپلیکیشن</h5>
            <ul>
              {!Object.keys(user).length && (
                <li>
                  <Link to="/signin">
                    <i className="fal fa-user" />
                    <span>ورود اعضا</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/settings">
                  <i className="fal fa-cog" />
                  <span>تنظیمات</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="fal fa-puzzle-piece" />
                  <span>درباره‌ما</span>
                </Link>
              </li>
              {Object.keys(user).length ? (
                <li>
                  <a onClick={this.signout}>
                    <i className="fal fa-sign-out-alt" />
                    <span>خروج</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
