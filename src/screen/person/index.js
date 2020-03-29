import React from 'react'
import { withRouter } from 'react-router-dom'

import './style.scss'

class PersonScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { id } = this.props.match.params
  }

  render() {
    const { name } = this.props.match.params
    return (
      <div id="screen-person">
        <h1>{name}</h1>
      </div>
    )
  }
}

export default withRouter(PersonScreen)

// export default function PersonScreen() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams()

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   )
// }
