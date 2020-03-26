import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

export default class Side extends React.Component {
  render() {
    return (
      <>
        <div id="side">
          <h5>کتابخانه</h5>
          <ul>
            <li>
              <Link to="/">
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
      </>
    )
  }
}
