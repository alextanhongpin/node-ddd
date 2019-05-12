const required = require('../../model/required')

class Service {
  #repo

  constructor(repo) {
    required(repo, 'repo')

    this.#repo = repo 
  }
  async hasEmail(email) {
    return this.#repo.hasEmail(email)
  }
}

module.exports = (repo) => 
  Object.freeze(new Service(repo))
