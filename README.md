# extratorrent-api

[![Build Status](https://travis-ci.org/ChrisAlderson/tvmaze-api.svg?branch=master)]()
[![Dependency Status](https://david-dm.org/ChrisAlderson/tvmaze-api.svg)](https://david-dm.org/ChrisAlderson/tvmaze-api)
[![devDependency Status](https://david-dm.org/ChrisAlderson/tvmaze-api/dev-status.svg)](https://david-dm.org/ChrisAlderson/tvmaze-api#info=devDependencies)

An TVMaze wrapper for NodeJS.

## Usage

#### Setup
```
npm install --save tvmaze-api
```

### Initialize
```js
const TVMazeAPI = require("tvmaze-api");

// Options are the request default options.
const tvmazeAPI = new TVMazeAPI();
```

### Methods

```
 - searchShows(q)
 - searchPeople(q)
 - singleSearchShow(q)
 - lookupShow({[tvrage, thetvdb, imdb]})
 - getShow({id, [embed]})
 - getEpisodes({id, [specials]})
 - getEpisodeByNumber({id, season, episode})
 - getEpisodeByDate({id, date})
 - getSeasons({id})
 - getCast({id})
 - getCrew({id})
 - getAliases({id})
 - getPage(page)
 - getPerson({id, [embed]})
 - getCastCredits({id, [embed]})
 - showUpdates()
 - getSchedule({country, date})
 - getFullSchedule({id})
```

# License

MIT License

Copyright (c) 2016 - tvmaze-api - Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
