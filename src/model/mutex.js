class Mutex {
  #locked = false
  async execute(fn) {
    if (this.#locked) {
      console.log('called')
      return
    }
    this.#locked = true
    try {
      await fn()
    } catch (err) {
      throw err
    } finally {
      this.#locked = false
    }
  }
}

module.exports = () =>
  Object.seal(new Mutex())
