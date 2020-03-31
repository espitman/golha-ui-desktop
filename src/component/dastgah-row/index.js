import React from 'react'

import './style.scss'

export default class DastgahRow extends React.Component {
  render() {
    const { id, style, dastgahs } = this.props
    const width = dastgahs.length * 330
    return (
      <div id={id} className="dastgah-row" style={style}>
        <h3>دستگاه / آواز ({dastgahs.length})</h3>
        <ul style={{ width }}>
          {dastgahs.map((dastgah) => {
            const { title, count } = dastgah
            return (
              <li key={`dastgah_${title}`}>
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
    )
  }
}
