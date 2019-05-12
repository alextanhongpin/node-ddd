const required = require('../../model/required')

class Repository {
  #db
  constructor(db) {
    required(db, 'db')

    this.#db = db
  }
  async createUser ({ email, password }) {
    required(email, 'email')
    required(password, 'password')
    return true 
  }
  async hasEmail(email) {
    return false 
  }
}

module.exports = (db) => 
  Object.freeze(new Repository(db))

