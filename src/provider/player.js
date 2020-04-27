import { findIndex } from 'lodash'

export default class PlayerProvider {
  constructor(props) {
    this.stateSetter = props.stateSetter
    this.socket = props.socket
    this.visible = false
    this.isPlaying = false
    this.track = {}
    this.playList = []
    this.state = {}
  }

  setState = (states) => {
    this.stateSetter(states)
  }

  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }

  play = (track) => {
    const isInPlayList = this.isInPlayList(track._id)
    if (!isInPlayList) {
      this.clearPlayList()
      this.addToPlayList(track)
    }

    this.isPlaying = true
    this.track = track
    this.show()

    this.setState({
      currentTrack: this.track,
      showPlayer: this.visible,
      isPlaying: this.isPlaying
    })
    this.socket.emit('track/play', { _id: track._id })
  }

  pause = () => {
    this.isPlaying = false
    this.setState({
      isPlaying: this.isPlaying
    })
  }

  togglePlay = () => {
    this.isPlaying = !this.isPlaying
    this.setState({
      isPlaying: this.isPlaying
    })
    return this.isPlaying
  }

  hide = () => {
    this.hide()
    this.setState({
      showPlayer: this.visible,
      isPlaying: this.isPlaying
    })
  }

  addingToPlayList(track) {
    if (track._id !== this.track._id && !this.isInPlayList(track._id)) {
      this.playList.push(track)
      this.socket.emit('playlist/add', {
        _id: track._id,
        playList: this.playList.map(({ _id }) => _id)
      })
      return true
    }
    return false
  }

  addToPlayList = (track) => {
    const isInPlayList = this.addingToPlayList(track)
    if (!this.isPlaying && this.playList.length === 1) {
      this.play(track)
    }
    this.setState({ playlist: this.playList })
    return isInPlayList
  }

  addToPlayListGroup = (tracks) => {
    this.clearPlayList()
    tracks.forEach((trk) => {
      this.addingToPlayList(trk)
    })
    this.setState({ playlist: this.playList })
  }

  removeFromPlayList = (track) => {
    const index = this.getPlayListIndex(track._id)
    if (index === -1) {
      return false
    }
    this.playList.splice(index, 1)
    this.setState({ playlist: this.playList })
    this.socket.emit('playlist/remove', {
      _id: track._id,
      playList: this.playList.map(({ _id }) => _id)
    })
    return true
  }

  isInPlayList = (_id) => {
    if (this.getPlayListIndex(_id) === -1) {
      return false
    }
    return true
  }

  getPlayListIndex(_id) {
    return findIndex(this.playList, { _id })
  }

  getNextTrack() {
    const playListIndex = this.getPlayListIndex(this.track._id)
    if (this.playList.length > playListIndex + 1) {
      return this.playList[playListIndex + 1]
    }
    return null
  }

  playNextTrack = () => {
    const nextTrack = this.getNextTrack()
    if (nextTrack) {
      this.play(nextTrack)
    } else {
      this.pause()
    }
  }

  clearPlayList = () => {
    this.playListIndex = -1
    this.playList = []
    this.socket.emit('playlist/clear', {})
    this.setState({ playlist: this.playList })
  }
}
