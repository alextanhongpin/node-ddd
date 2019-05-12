const required = require('../../model/required')

class Credential {
  #data
  constructor({ email, password }) {
    required(email, 'email')
    required(password, 'password')

    this.#data = {email, password} 
  }
  validate () {
    const { email = '', password = '' } = this.#data
    if (!email.trim().length) {
      throw new Error('email is required')
    }
    if (!password.trim().length) {
      throw new Error('password is required')
    }
    if (!email.includes('@')) {
      throw new Error('invalid email')
    }
    if (password.length < 8) {
      throw new Error('password must be at least 8 characters')
    }
  }
  json() {
    return this.#data
  }
}

module.exports = {
  Credential 
} 
