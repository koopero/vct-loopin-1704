module.exports = snapshot
const H = require('horten')


function snapshot() {
  const loopin = this
      , opt = {}


  loopin.plugin('save')

  const cursor = new H.Cursor( {
    listening: true,
    path: 'logic/snapshot/snap',
    onValue
  } )

  return

  function onValue( v ) {
    if ( v ) {
      snap()
    }
  }

  function filename( t ) {
    const ext = '.jpg'
        , base = 'data/snapshot/'+opt.buffer+'.' + t.toFixed(0) + ext

    return loopin.filesResolve( base )
  }

  function snap() {
    opt.buffer = H.root.get('logic/snapshot/buffer')

    if ( !opt.buffer )
      return

    const t = new Date().getTime()
        , file = filename( t )

    loopin.save( opt.buffer, { dest: file } )
      .then( function ( data ) {

      })
  }
}
