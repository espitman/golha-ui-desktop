export default class PlayerProvider {
  constructor(props) {
    this.playerService = new props.PlayerService()
    this.stateSetter = props.stateSetter
    this.state = {}
  }

  setState = (states) => {
    this.state = { ...this.state, ...states }
    this.stateSetter(states)
  }

  play = (track) => {
    const isInPlayList = this.playerService.isInPlayList(track._id)
    if (!isInPlayList) {
      this.clearPlayList()
      this.addToPlayList(track)
    }
    this.playerService.play(track)
    this.setState({
      currentTrack: this.playerService.track,
      showPlayer: this.playerService.visible,
      isPlaying: this.playerService.isPlaying
    })
  }

  pause = () => {
    this.playerService.pause()
    this.setState({
      isPlaying: this.playerService.isPlaying
    })
  }

  togglePlay = () => {
    this.playerService.togglePlay()
    const isPlaying = this.playerService.isPlaying
    this.setState({
      isPlaying
    })
    return isPlaying
  }

  hide = () => {
    this.playerService.hide()
    this.setState({
      showPlayer: this.playerService.visible,
      isPlaying: this.playerService.isPlaying
    })
  }

  playNextTrack = () => {
    const nextTrack = this.playerService.getNextTrack()
    if (nextTrack) {
      this.play(nextTrack)
    } else {
      this.pause()
    }
  }

  clearPlayList = () => {
    this.playerService.clearPlayList()
    this.setState({ playlist: this.playerService.playList })
  }

  addToPlayList = (track) => {
    const isInPlayList = this.playerService.addToPlayList(track)
    if (
      !this.playerService.isPlaying &&
      this.playerService.playList.length === 1
    ) {
      this.play(track)
    }
    this.setState({ playlist: this.playerService.playList })
    return isInPlayList
  }

  removeFromPlayList = (track) => {
    this.setState({ playlist: this.playerService.playList })
    return this.playerService.removeFromPlayList(track)
  }

  isInPlayList = (_id) => {
    return this.playerService.isInPlayList(_id)
  }
}
