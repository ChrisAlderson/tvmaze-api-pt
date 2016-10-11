"use strict";

const TVMazeAPI = require("../tvmaze-api");

let tvMaze = new TVMazeAPI();


tvMaze.searchShows(q)
  .then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.searchPeople(q)
  .then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.singleSearchShow(q)
  .then(res => console.log(res))
  .catch(err => console.error(err));


const tvrage = tvMaze.lookupShow({
  tvrage: 24493
 });
const thetvdb = tvMaze.lookupShow({
  thetvdb: 81189
 });
const imdb = tvMaze.lookupShow({
  imdb: "tt0944947"
 });

Promise.all([tvrage, thetvdb, imdb])
  .then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getShow({
  id: 24,
  embed: "episodes"
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getEpisodes({
  id: 24,
  specials: true
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getEpisodeByNumber({
  id: 24,
  season: 1,
  episode: 1
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getEpisodeByDate({
  id: 24,
  date: "2010-09-20"
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getSeasons({
  id: 24
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getCast({
  id: 24
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getCrew({
  id: 24
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getAliases({
  id: 24
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getPage(1)
  .then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getPerson({
  id: 24,
  embed: "episodes"
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getCastCredits({
  id: 1,
  embed: "castcredits"
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.showUpdates()
  .then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getSchedule({
  country: "US",
  date: "2014-12-01"
}).then(res => console.log(res))
  .catch(err => console.error(err));


tvMaze.getFullSchedule({
  id: 24
}).then(res => console.log(res))
  .catch(err => console.error(err));
