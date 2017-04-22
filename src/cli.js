#!/usr/bin/env node
const config = require('./config')
    , loopin = require('./loopin')
    , server = require('./server')


server.configureCLI()
server.open()
