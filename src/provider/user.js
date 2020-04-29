export default class UserProvider {
  constructor(props) {
    this.stateSetter = props.stateSetter
    this.user = {}
  }
  setState = (states) => {
    this.stateSetter(states)
  }
  setUser = (user) => {
    this.user = user
    this.setState({ user })
  }
}
