This is demo of [Loopin](https://github.com/koopero/looping), presented at
[Vancouver Creative Techology Meetup](https://www.meetup.com/Vancouver-Creative-Technology/), April 25th, 2017. This repository contains all files specific to the demo, but my intention is that it can also 
act as a starting point for your own **Loopin** project.



# The Loopin Challenge!

As Loopin becomes more mature, I would like to hear some feedback regarding how *you* might
use Loopin. And what better way to get feedback than to offer **fabulous
prizes!**

Here's the challenge: Create a demo using Loopin and present is at next month's
[Vancouver Creative Techology Meetup](https://www.meetup.com/Vancouver-Creative-Technology/), and you'll be eligible to win an [Orange Pi Zero](http://www.orangepi.org/orangepizero/)! If prizes run out, there will also be beer.



## Getting Started

First, you'll need to get Loopin running on you system. *Unfortunately, this is
currently not possible on Windows.* Follow the installation procedure [here](https://github.com/koopero/loopin-native)
to initialize loopin-native.

Then, clone this project from github and run it.

``` sh
git clone https://github.com/koopero/vct-loopin-1704.git
cd vct-loopin-1704
npm install

# sudo is sometimes require for the kinect to work properly.
sudo node src/server.js
```

Note that this demo pretty much requires a Kinect camera to
run. I'll bring an extra to the meetup in case anyone doesn't have one.

Once the application is running, all the files under `/shader`, `/preset` and `/image` can be edited live.
Controls will be available at `localhost:8080`.

## Support

Unfortunately, Loopin currently has almost no documentation available. Sorry about that. I will continue to update this repo with more comments and docs. If you need help getting a Loopin project running, please feel free to contact me:

* Email: [samm@sublight.ca](mailto:samm@sublight.ca)
* Slack: [koopero on popmatrix.slack.com](https://popmatrix.slack.com/messages/@koopero/team/koopero/)

# Thanks!
