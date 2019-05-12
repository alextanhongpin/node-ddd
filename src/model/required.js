const required = (value, name) => {
  if (value == null || value == undefined) {
    throw new Error(`"${name}" is required`)
  }
}

module.exports = required 
