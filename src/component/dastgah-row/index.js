import React from 'react'
import { withRouter } from 'react-router'

import './style.scss'

class DastgahRow extends React.Component {
  handleClick = (dastgah) => {
    const { title } = dastgah
    this.props.history.push(`/dastgah/${title}`)
  }

  render() {
    const { id, style, dastgahs } = this.props
    const width = dastgahs.length * 330
    return (
      <div id={id} className="dastgah-row">
        <h3>دستگاه / آواز ({dastgahs.length})</h3>
        <div id={`${id}-inner`} className="dastgah-row-inner" style={style}>
          <ul style={{ width }}>
            {dastgahs.map((dastgah) => {
              const { title, count } = dastgah
              return (
                <li
                  key={`dastgah_${title}`}
                  onClick={() => this.handleClick(dastgah)}
                >
                  <div className="dastgah-box">
                    <div className="dastgah-box-overlay"></div>
                    <h4>{title}</h4>
                    <div className="dastgah-info">تعداد برنامه: {count}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(DastgahRow)
