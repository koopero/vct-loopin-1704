module.exports = recorder

recorder.options = require('boptions')({
  buffer: 'kinect',
  prefix: 'data/frame/a.',
  format: 'jpg',
  enabled: false,
  rate: 4
})


function recorder() {
  const opt = new H.Mutant( recorder.options( arguments ) )
      , loopin = this

  var _saving
    , _timeout
    , _lastTime = 0

  const cursor = new H.Cursor({
    listening: true,
    path: '/plugin/recorder',
    onValue
  })

  loopin.plugin('save')
  cursor.pull()

  return

  function onValue( v ) {
    console.log('RECORDER ON VALUE', v )

    opt.patch( v )
    tick()
  }


  function now() {
    return new Date().getTime()
  }

  function filename( t ) {
    const ext = '.jpg'
        , prefix = opt.get('prefix') || 'undef'
        , base = prefix + t.toFixed(0) + ext

    return loopin.filesResolve( base )
  }

  function tick() {
    const t = now()
        , delta = t - _lastTime
        , enabled = !!opt.get('enabled')
        , rate = parseFloat( opt.get('rate') ) || 0



    if ( enabled && rate ) {
      const frameTime = 1000 / rate
      if ( !_lastTime || delta >= frameTime ) {
        save()
      }
      next()
    }
  }

  function next() {
    if ( !_timeout )
      _timeout = setTimeout( function () {
        _timeout = null
        tick()
      }, 10 )
  }


  function save() {
    if ( _saving ) {
      return
    }


    _saving = true
    const dest = filename( now() )
        , buffer = opt.get('buffer')
        , format = opt.get('format')

    return loopin.save( buffer, { dest, format } )
      .catch( function ( error ) {
        console.log('RECORDED DROP', error )
      })
      .then( function ( data ) {
        _lastTime = now()
        _saving = false
      })
  }
}
