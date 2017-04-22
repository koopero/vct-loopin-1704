module.exports = snapshot
const H = require('horten')

snapshot.options = require('boptions')({
  buffer: 'main',
  prefix: 'data/snap/snap.'
})


function snapshot() {
  const loopin = this
      , opt = snapshot.options( arguments )

  loopin.plugin('save')

  const cursor = new H.Cursor( {
    listening: true,
    path: 'logic/snapshot',
    onValue
  } )

  return

  function onValue( v ) {
    console.log('ON VALUE', v)
    if ( !v )
      return

    if ( v.snap ) {
      snap( v.snap )
    }
  }

  function filename( t ) {
    const ext = '.jpg'
        , base = opt.prefix + t.toFixed(0) + ext

    return loopin.filesResolve( base )
  }

  function snap() {
    const t = new Date().getTime()
        , file = filename( t )

    loopin.save( opt.buffer, { dest: file } )
      .then( function ( data ) {

      })
  }
}
