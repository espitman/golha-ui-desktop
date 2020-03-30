const storage = {
  set(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}

export default storage
