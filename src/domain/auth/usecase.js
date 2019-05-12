const required = require('../../model/required')
const { Credential } =  require('./model')

class UseCase {
  #service
  #repo

  constructor(service, repo) {
    required(service, 'service')
    required(repo, 'repo')

    this.#service = service
    this.#repo = repo
  }

  async register(email, password) {
    const exist = await this.#service.hasEmail(email)
    if (exist) {
      throw new Error('email already exists')
    }
    const credential = new Credential({
      email,
      password
    })
    // Throws error if the validation failed.
    credential.validate()
    const user = await this.#repo.createUser(credential.json())
    return user
  }
}

module.exports = (service, repo) =>
  Object.freeze(new UseCase(service, repo))
