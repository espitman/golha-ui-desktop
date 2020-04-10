import { findIndex } from 'lodash'

export class PlayerService {
  constructor() {
    this.visible = false
    this.isPlaying = false
    this.track = {}
    this.playList = []
  }
  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }
  play(track) {
    // this.clearPlayList()
    this.isPlaying = true
    this.track = track
    this.show()
  }
  pause() {
    this.isPlaying = false
  }
  togglePlay() {
    this.isPlaying = !this.isPlaying
    return this.isPlaying
  }
  addToPlayList(track) {
    if (track._id !== this.track._id && !this.isInPlayList(track._id)) {
      this.playList.push(track)
      return true
    }
    return false
  }
  removeFromPlayList(track) {
    const index = this.getPlayListIndex(track._id)
    if (index === -1) {
      return false
    }
    this.playList.splice(index, 1)
    return true
  }
  clearPlayList() {
    this.playListIndex = -1
    this.playList = []
  }
  getNextTrack() {
    const playListIndex = this.getPlayListIndex(this.track._id)
    if (this.playList.length > playListIndex + 1) {
      return this.playList[playListIndex + 1]
    }
    return null
  }
  getPlayListIndex(_id) {
    return findIndex(this.playList, { _id })
  }
  isInPlayList(_id) {
    if (this.getPlayListIndex(_id) === -1) {
      return false
    }
    return true
  }
}
