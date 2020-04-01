export class PlayerService {
  constructor() {
    this.visible = false
  }
  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }
  play(track) {
    console.log(track)
    this.show()
  }
}
