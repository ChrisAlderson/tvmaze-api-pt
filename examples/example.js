// Import the necessary modules.
/* eslint-disable no-console */
const TVMazeAPI = require('..')

// Create a new instance of the module.
const tvMaze = new TVMazeAPI()

tvMaze.searchShows('Lost').then(res => {
  console.log(res)
  return tvMaze.searchPeople('Lost')
}).then(res => {
  console.log(res)
  return tvMaze.singleSearchShow({
    q: 'Lost',
    embed: 'episodes'
  })
}).then(res => {
  console.log(res)

  const tvrage = tvMaze.lookupShow({
    tvrage: 24493
  })
  const thetvdb = tvMaze.lookupShow({
    thetvdb: 81189
  })
  const imdb = tvMaze.lookupShow({
    imdb: 'tt0944947'
  })
  return Promise.all([tvrage, thetvdb, imdb])
}).then(res => {
  console.log(res)
  return tvMaze.getShow({
    id: 23,
    embed: 'episodes'
  })
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodes({
    id: 24,
    specials: true
  })
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodeByNumber({
    id: 24,
    season: 1,
    episode: 1
  })
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodeByDate({
    id: 24,
    date: '2009-09-20'
  })
}).then(res => {
  console.log(res)
  return tvMaze.getSeasons(24)
}).then(res => {
  console.log(res)
  return tvMaze.getCast(24)
}).then(res => {
  console.log(res)
  return tvMaze.getCrew(24)
}).then(res => {
  console.log(res)
  return tvMaze.getAliases(24)
}).then(res => {
  console.log(res)
  return tvMaze.getPage(1)
}).then(res => {
  console.log(res)
  return tvMaze.getPerson({
    id: 24,
    embed: 'castcredits'
  })
}).then(res => {
  console.log(res)
  return tvMaze.getCrewCredits({
    id: 1,
    embed: 'show'
  })
}).then(res => {
  console.log(res)
  return tvMaze.getCastCredits({
    id: 1,
    embed: 'show'
  })
}).then(res => {
  console.log(res)
  return tvMaze.showUpdates()
}).then(res => {
  console.log(res)
  return tvMaze.getSchedule({
    country: 'US',
    date: '2014-12-01'
  })
}).then(res => {
  console.log(res)
  return tvMaze.getFullSchedule(24)
}).then(res => console.log(res))
  .catch(err => console.error(err))
