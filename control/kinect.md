# Kinect

``` control
path: loopin/show/buffer
options:
  - kinect_live
  - kinect
  - kinascii
```


## Source

``` control
path: loopin/render/kinect/src/buffer
options:
  - kinect_live
  - kinect_test
```

## Filter



## Hardware
``` control
path: loopin/kinect/kinect_live/
trigger: true
title: Enable Kinect
```

``` control
path: loopin/kinect/kinect_live/
subs:
  tilt:
    type: float
    unit: deg
    min: -30
    max: 30
    markers:
      - -30
      - -15
      - 0
      - 15
      - 30

  output:
    options:
      - both
      - depth
      - video
      - alpha

  led:
    options:
      - default
      - off
      - green
      - red
      - yellow
      - blinkGreen
      - blinkYellowRed

  infrared:
    options: [ 0, 1 ]
```
