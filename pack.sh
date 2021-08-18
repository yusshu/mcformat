#!/bin/bash

##
## Script to minify and compress the library
## (Requires an internet connection, 'curl' and 'zip')
##

##
## Minify mcformat.js file using
## a HTTP API (javascript-minifier)
##
curl -X POST -s --data-urlencode 'input@mcformat.js' https://javascript-minifier.com/raw > mcformat.min.js

##
## Minify mcformat.css file using
## a HTTP API (cssminifier)
##
curl -X POST -s --data-urlencode 'input@mcformat.css' https://cssminifier.com/raw > mcformat.min.css

##
## Zip the required files
##
zip -r mcformat.zip font mcformat.min.js mcformat.min.css
