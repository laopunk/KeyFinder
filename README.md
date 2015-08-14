KEYFINDER
===
## Purpose
This is is a web based tool for musicians or music lovers developed around the concept of musical scales, and rendered with React.js

Clearly, it will allow you to "sound good" and more importantly "sound in key" when you want to randomly play sounds.
- use cases
	- Find the scale you're in, from a set of chords or notes (Ideal for composers)
	- Find all existing chords and notes in a scale you're interested in working with
  - Get your browser improvise on a selected key in a selected scale, based on the WebAudio API

- It is heavily relying on the following libraries:
  - scalesapi: [scalesapi npm](https://www.npmjs.com/package/scalesapi) / [scalesapi github](https://github.com/laopunk/scalesapi)
  - notePlayer: [notePlayer npm](https://www.npmjs.com/package/noteplayer) / [notePlayer github](https://github.com/laopunk/notePlayer)
  - chordPlayer: [chordPlayer npm](https://www.npmjs.com/package/chordplayer) / [chordPlayer github](https://github.com/laopunk/chordPlayer)

## Working Example:
You will find a live example at [laopunk](http://laopunk.com/KeyFinder/index.html)'s main site


## Installation:
You can run this code locally by cloning this project and run the following:
```shell
gulp 
```
This will create all files in the "prod" directory. Now run a local webserver like [httpster](https://www.npmjs.com/package/httpster) (needed for dev since we are using [gulp-livereload](https://www.npmjs.com/package/gulp-livereload) to automatically reload the page after changes)
```shell
cd prod && httpster 
```
And from your browser load
```shell
http://localhost:3333/
```