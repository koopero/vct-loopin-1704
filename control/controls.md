# Welcome!

This is a demonstration of Loopin, my new framework designed for the rapid development of creative, visual applications.

Please bookmark this demo's repository [here](https://github.com/koopero/vct-loopin-1704).

This page of controls is rendered by Loopin's friend [horten-control](https://github.com/koopero/horten-control). Controls are rendered from markdown files with embedded
YAML control configuration. You can see the source for this page [here](/control/controls.md).

Use the navbar at the top to access other control pages.

Loopin is designed for collaboration, so *feel free to play around!*


# Controls

Here are some basic Loopin controls:

## Show

**/show** is probably the most important component in Loopin. It is used to choose
which image buffer is to be displayed on the output screen. Here are all the buffers
available in this demo.

``` control
path: loopin/show/buffer
options:
  - kinect_live
  - kinect
  - kinascii
  - kinascii_charset
  - kinascii_palette
```

For very low resolution buffers such as *kinascii_palette*, it is useful to be able
to choose the interpolation filter on the displayed buffer.

``` control
path: loopin/show/filter
options:
  - nearest
  - linear
```

## Snapshot

Snapshot allows a user to capture a quick shot of any Loopin buffer, for posting to
The Instant Gram or whatever.

The source code for this module is at [/src/logic/snapshot.js](/loopin/file/src/logic/snapshot.js)
You can see the output of the snapshot module at [here](/loopin/file/data/snapshot/).

*If you see a cool image, hit snap!*

``` control
path: logic/snapshot
subs:
  snap:
    type: trigger
    title: Snap
    hide: all

  buffer:
    options:
      - kinect
      - kinect_live
      - kinascii
```
