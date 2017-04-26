``` control
path: loopin/show/buffer
options:
  - kinect_live
  - kinect
  - kinascii
  - kinascii_charset
  - kinascii_palette
```

# kinascii

**kinascii** is a little experiment I put together, based on continuing research into more psychedelic uses of kinect technology. It maps a kinect image in a cloud of quads, and maps each of those quads with an ascii character, referencing the look of ascii art.

## Focus

The Kinect is a 3D device. To re-project its image in 2D space, it's very helpful to
have a focal point on the z axis. This point is used both for camera translation and
colour using **Palette**.

The best way to focus this control is to rotate the camera to a 90 degree yaw, and
then tune the **kinectFocusDepth** parameter to place the subject in the centre of
the screen.

``` control
path: loopin/render/kinascii/float/kinectFocusDepth
type: float
unit: '%'
```
``` control
path: loopin/camera/kinascii/yaw
type: float
min: -90
max: 90
unit: deg
markers:
  - -90
  - 0
  - 90
```

Then we can control the virtual depth of field of the result.

``` control
path: loopin/render/kinascii/float/dof
type: float
unit: '%'
```


## Palette

The palette of **kinascii** is used to map the depth of the kinects image to an RGBA colour. We can see the palette buffer by choosing it with **/show**.

``` control
path: loopin/show/buffer
trigger: kinascii_palette
```

An extremely low resolution buffer is created using the **/pixels** directive. This can be edit using the control below. The control is divided into 5 pixels, each with control over red, green, blue and alpha values. In the case of **kinascii**, the alpha value is mapped to an ascii grayscale.

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

## Resolution

To change the resolution of the kinascii display, we change the **/mesh** which is used as input.

This is one part of Loopin that actually has some [documentation](https://github.com/koopero/loopin/wiki/Mesh)!

``` control
path: loopin/mesh/kinascii/plane
trigger:
  cols: 320
  rows: 160
```
``` control
path: loopin/mesh/kinascii/plane
trigger:
  cols: 160
  rows: 80
```
``` control
path: loopin/mesh/kinascii/plane
trigger:
  cols: 80
  rows: 25
```
``` control
path: loopin/mesh/kinascii/plane
trigger:
  cols: 40
  rows: 25
```

## Geometry

The kinascii shader makes some attempt to point individual quad towards the screen.
The amount of this effect is controlled below.

``` control
path: loopin/render/kinascii/float/quadFace
type: float
unit: '%'
```

The size of the screen-space quads is below. These will only be used when **quadFace**
is greater than zero.

``` control
path: loopin/render/kinascii/float/quadFaceW
type: float
unit: '%'
min: 0.0001
max: 0.25
```

``` control
path: loopin/render/kinascii/float/quadFaceH
type: float
unit: '%'
min: 0.0001
max: 0.25
```

When **quadFace** is set lower, this control will control the size of characters.

``` control
path: loopin/render/kinascii/float/quadExpand
type: float
unit: '%'
min: 0.0
max: 6
```

## Camera

Loopin includes the **/camera/** directive to control the
projection of 3D models on screen.

``` control
path: loopin/camera/kinascii
subs:
  zoom:
    type: float
    min: 0
    max: 7

  distance:
    type: float
    min: 0.1
    max: 1
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

## Source

**Loopin** allows almost any image buffer to be plugged into the inputs of any
render. Here, we can choose between using the filtered kinect image and the raw
image straight from the hardware.

``` control
path: loopin/render/kinascii/src/buffer
options:
  - kinect_live
  - kinect
```

## Additional Psychedelia

To create some really trippy, glitchy images, we can tune how Loopin renders **kinascii**.
**clear** controls whether the render buffer is cleared every frames, and **depthTest**
controls whether the z-buffer is used.

``` control
path: loopin/render/kinascii
subs:
  clear:
    type: trigger
    toggle: true

  depthTest:
    type: trigger
    toggle: true
```
