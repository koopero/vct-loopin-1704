const loopin = module.exports = require('loopin').global()

const config = require('./config')

loopin.plugin('horten','loopin/')
loopin.plugin('files')

loopin.filesRoot( require('path').resolve( __dirname, '..' ) )

loopin.plugin('presetDir')
loopin.plugin('shaderDir')
loopin.plugin('imageDir')
loopin.imageDir()
loopin.shaderDir()

loopin.preset('setup')
loopin.preset('kinascii')
loopin.preset('kinect')


loopin.plugin( require('./logic/snapshot' ) )

if ( config.get('debug.verbose') )
  loopin.logShow('patch')

loopin.plugin('bootstrap')
