
# Endpoints

**Loopin**, when combined with the [loopin-server](https://github.com/koopero/loopin-server) module,
is a graphics engine with a webserver built in. Many of its internals are available as RESTful
endpoints.

## /loopin/buffer/*

We can see any image buffer with Loopin by accessing the */loopin/buffer/\** endpoint.

* [kinascii](/loopin/buffer/kinascii.jpg)
* [kinect](/loopin/buffer/kinect.jpg)
* [kinect_live](/loopin/buffer/kinect_live.jpg)


![kinascii_output](/loopin/buffer/kinascii.jpg)

## /loopin/read

We can see the entire state of the Loopin engine by examining the [/loopin/read/](/loopin/read/) endpoint. *Warning: Big mass of JSON!*

We can also read a small subset of the state, such as [/loopin/read/render/kinascii](/loopin/read/render/kinascii), which
will show the parameters of the **kinascii** demo.

## Window

Loopin is designed to complete own the host machine. Therefore, we can remotely
control parameters of the application's window.

``` control
path: loopin/window/fullscreen
type: trigger
toggle: true
```

The **/osd** or on-screen-display module puts a very simple text overlay on the screen,
designed for debugging applications. Here, we use it to show a welcome message.

``` control
path: loopin/osd/enabled
type: trigger
toggle: true
```

``` control
path: loopin/osd/text
type: text
size: 60
```

# Kinascii Setup

Here are some of the parameters that [kinascii](/page/control/kinascii.md) uses to
translate 2D kinect images into 3D coordinates. These are a bit confusing, but
I'm adding them here in case they need to be tuned.

``` control
path: loopin/render/kinascii
subs:

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
```
