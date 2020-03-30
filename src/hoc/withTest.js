/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'

export function withTest(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 1
      }
    }

    componentDidMount() {
      setInterval(() => {
        this.increase()
      }, 1000)
    }

    increase = () => {
      const count = this.state.count + 1
      this.setState({ count })
    }

    render() {
      return <WrappedComponent count={this.state.count} {...this.props} />
    }
  }
}
