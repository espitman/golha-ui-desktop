import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

export default class Side extends React.Component {
  render() {
    const { user } = this.props
    console.log(user)
    return (
      <>
        <div id="side">
          <div id="side-menu-library">
            <h5>کتابخانه</h5>
            <ul>
              <li>
                <Link to="/" id="homeLink">
                  <i className="fal fa-home"></i>
                  <span>صفحه اصلی</span>
                </Link>
              </li>
              <li>
                <Link to="/programs">
                  <i className="fal fa-music"></i>
                  <span>برنامه‌ها</span>
                </Link>
              </li>
              <li>
                <Link to="/artists">
                  <i className="fal fa-microphone-stand"></i>
                  <span>هنرمندان</span>
                </Link>
              </li>
              <li>
                <Link to="/archive">
                  <i className="fal fa-album-collection"></i>
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
                    <i className="fal fa-user"></i>
                    <span>ورود اعضا</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/settings">
                  <i className="fal fa-cog"></i>
                  <span>تنظیمات</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="fal fa-puzzle-piece"></i>
                  <span>درباره‌ما</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}
