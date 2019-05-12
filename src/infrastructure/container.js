const Database = require('./db')
const Config = require('./config')
const Logger = require('./logger')
const Auth = require('../domain/auth')
const Mutex = require('../model/mutex')

class Container {
  #db = null;
  #dbMutex = Mutex();
  #logger = null;
  #config = null;

  config () {
    if (this.#config) {
      return this.#config
    }
    this.#config = Config()
    return this.#config
  }
  
  logger () {
    if (this.#logger) {
      return this.#logger
    }
    this.#logger = Logger()
    return this.#logger
  }

  async db () {
    // Since the db is loaded asynchronously, the #db might not be set yet.
    // To ensure the database is not initialised twice, wrap the call in a
    // mutex which acts like go's sync.Once.
    if (this.#db) {
      return this.#db
    }
    await this.#dbMutex.execute(async () => {
      // NOTE: Ignore repeating calls. This will not happen.
      // if (this.#db) {
      //   return
      // }
      this.#db = await Database()
    })
    return this.#db
  }

  async createAuthRepository() {
    const db = await this.db()
    return Auth.Repository(db)
  }
  async createAuthService() {
    const service = await this.createAuthRepository()
    return Auth.Service(service)
  }
  async createAuthUseCase() {
    const service = await this.createAuthService()
    const repository = await this.createAuthRepository()
    return Auth.UseCase(service, repository)
  }
}

module.exports = () => 
  Object.freeze(new Container())
