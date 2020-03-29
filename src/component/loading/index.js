import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from './loader.json'

import './style.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default
}

export default class Loading extends React.Component {
  render() {
    const { width = 300, height = 300 } = this.props
    return (
      <div className={'loading-full'}>
        <Lottie options={defaultOptions} width={width} height={height} />
        <h6>درحال دریافت اطلاعات...</h6>
      </div>
    )
  }
}
