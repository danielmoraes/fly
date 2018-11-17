const loader = require('esm')(module)

loader('module-alias/register')

module.exports = loader('./src')
