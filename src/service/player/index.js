export class PlayerService {
  constructor() {
    this.visible = false
    this.isPlaying = false
    this.track = {}
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
}
