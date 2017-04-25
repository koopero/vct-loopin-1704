# kinascii

``` control
path: loopin/show/buffer
options:
  - kinect_live
  - kinect
  - kinascii
  - kinascii_charset
  - kinascii_palette
```

## Palette

``` control
path: loopin/show/buffer
trigger: kinascii_palette
```

``` control
type: pixels
path: loopin/pixels/kinascii_palette/pixels
rows: 1
cols: 5
channels: rgba
```
Note that the colours are transmitted as vaguely CSS-like strings, which can be edited and copied and pasted into presets.
``` control
type: text
path: loopin/pixels/kinascii_palette/pixels
size: 48
```

## Mesh
``` control
path: loopin/mesh/kinascii
trigger:
  plane:
    cols: 320
    rows: 240
    split: true
```
``` control
path: loopin/mesh/kinascii
trigger:
  plane:
    cols: 80
    rows: 25
    split: true
```
``` control
path: loopin/mesh/kinascii
trigger:
  plane:
    cols: 12
    rows: 9
    split: true
```

## Camera

``` control
path: loopin/camera/kinascii
subs:
  zoom:
    type: float
    min: 0
    max: 7

  distance:
    type: float
    min: -1
    max: 4
    markers:
      - 0
      - 1

  fov:
    type: float
    min: 0
    max: 180
    markers:
      - 1
      - 5
      - 15
      - 45
      - 90

  yaw:
    type: float
    min: -120
    max: 120
    unit: deg
    markers:
      - -45
      - 0
      - 45

  pitch:
    type: float
    min: -45
    max: 45
    unit: deg

  roll:
    type: float
    min: -45
    max: 45
    unit: deg
```

``` control
path: loopin/render/kinascii/float/kinectFocusDepth
type: float
min: 0
max: 1
```

``` control
path: loopin/render/kinascii/float/dof
type: float
min: 0
max: 1
```


## Low-Level Kinect To 3D Conversion

``` control
path: loopin/render/kinascii
subs:
  clear:
    options: [ 0, 1 ]

  depthTest:
    options: [ 0, 1 ]

  float/quadFaceW:
    type: float
    min: 0
    max: 0.2
    precision: 3

  float/quadFaceH:
    type: float
    min: 0
    max: 0.2
    precision: 3


  float/kinectZPow:
    type: float
    min: 0.5
    max: 8
    precision: 3

  float/kinectZMin:
    type: float
    min: 0
    max: 100

  float/kinectZMax:
    type: float
    min: 0
    max: 1000

  float/kinectFOV:
    type: float
    min: 1
    max: 90

  float/kinectFocusDepth:
    type: float
    min: 0
    max: 1

  float/quadFace:
    type: float
    min: 0
    max: 1
```
