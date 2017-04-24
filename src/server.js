const config = require('config')
    , loopin = require('./loopin')
    , server = loopin.plugin( require('loopin-server'), config.get('server') )

module.exports = server
