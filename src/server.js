const hortenServer = module.exports = require('horten-server').global()

const config = require('./config')
    , resolve = require('path').resolve.bind( null, __dirname, '..' )

hortenServer.configure( {
  root: resolve()
} )
hortenServer.configure( config.get('server') )



if ( require.main == module )
  hortenServer.open()
