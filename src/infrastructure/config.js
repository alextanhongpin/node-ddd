// config.js loads the config from different sources, including environment
// variables. Secrets are loaded differently.
const Config = () => {
  return Object.freeze({
    // uptime
    // version
    // build_at
    version: process.env.VERSION
  })
}

module.exports = Config
