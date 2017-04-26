Repeat the standard */show* control, so we can choose what to show on screen.
``` control
path: loopin/show/buffer
options:
  - kinect_live
  - kinect
  - kinascii
```

# Kinect

Here are controls for Kinect input and filtering.

## Filter

To enhance the output of the kinect, this demo uses a custom feedback shader. You
can see the difference between the filtered and un-filtered version by choosing
**kinect_live** or **kinect** above.

You can see the source for this filter at [/loopin/read/shader/kinect/frag/data](/loopin/read/shader/kinect/frag/data) or [/loopin/file/shader/kinect.frag](/loopin/file/shader/kinect.frag).

Here are the parameters for the feedback control:

``` control
path: loopin/render/kinect/float
subs:
  feedbackAmount:
    type: float
    unit: '%'

  fillAmount:
    type: float
    unit: '%'
```


## Hardware

The Loopin */kinect/* control gives full access to the kinect's hardware parameters.
Note that changing **infrared** will reset the kinect, which takes a few seconds.

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
