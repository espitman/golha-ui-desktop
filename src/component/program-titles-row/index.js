import React from 'react'
import { withRouter } from 'react-router-dom'

import './style.scss'

class ProgramTitlesRow extends React.Component {
  handleClick = (program) => {
    const { name } = program
    this.props.history.push(`/programs/${name}/1`)
  }

  render() {
    const { id, style, programs } = this.props
    const width = programs.length * 330
    return (
      <div id={id} className="program-titles-row">
        <h3>برنامه‌ها ({programs.length})</h3>
        <div
          id={`${id}-inner`}
          className="program-titles-row-inner"
          style={style}
        >
          <ul style={{ width }}>
            {programs.map((program) => {
              const { name, title, count } = program
              return (
                <li
                  key={`program_${name}`}
                  onClick={() => this.handleClick(program)}
                >
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
      </div>
    )
  }
}
export default withRouter(ProgramTitlesRow)
