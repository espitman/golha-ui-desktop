import React from 'react'

import './style.scss'

export default class ProgramTitlesRow extends React.Component {
  render() {
    const { style, programs } = this.props
    const width = programs.length * 330
    return (
      <div className="program-titles-row" style={style}>
        <h3>برنامه‌ها</h3>
        <ul style={{ width }}>
          {programs.map((program) => {
            const { name, title, count } = program
            return (
              <li key={`program_${name}`}>
                <div className="program-box">
                  <div className="program-box-overlay"></div>
                  <h4>{title}</h4>
                  <div className="program-info">تعداد برنامه: {count}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
