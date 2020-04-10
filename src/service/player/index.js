import { findIndex } from 'lodash'

export class PlayerService {
  constructor() {
    this.visible = false
    this.isPlaying = false
    this.track = {}
    this.playList = []
    this.playListIndex = -1
  }
  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }
  play(track) {
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
    if (
      track._id !== this.track._id &&
      findIndex(this.playList, { _id: track._id }) === -1
    ) {
      this.playList.push(track)
    }
  }
  getNextTrack() {
    console.log(this.playList.length, this.playListIndex)
    if (this.playList.length > this.playListIndex + 1) {
      this.playListIndex += 1
      return this.playList[this.playListIndex]
    }
    return null
  }
}
