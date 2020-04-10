import React from 'react'
import History from '../history'

import './style.scss'

export default class TitleBar extends React.Component {
  render() {
    return (
      <div className="title-bar">
        <History />
        <h1>رایو گل‌ها</h1>
      </div>
    )
  }
}
