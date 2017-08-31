// Import the necessary modules.
/* eslint-disable no-console */
const TVMazeAPI = require('../tvmaze-api-pt')

// Create a new instance of the module.
const tvMaze = new TVMazeAPI()

tvMaze.searchShows('Lost').then(res => {
  console.log(res)
  return tvMaze.searchPeople('Lost')
}).then(res => {
  console.log(res)
  return tvMaze.singleSearchShow('Lost')
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
  tvMaze.getShow({
    id: 24,
    embed: 'episodes'
  })
}).then(res => {
  console.log(res)
  tvMaze.getEpisodes({
    id: 24,
    specials: true
  })
}).then(res => {
  console.log(res)
  tvMaze.getEpisodeByNumber({
    id: 24,
    season: 1,
    episode: 1
  })
}).then(res => {
  console.log(res)
  tvMaze.getEpisodeByDate({
    id: 24,
    date: '2010-09-20'
  })
}).then(res => {
  console.log(res)
  tvMaze.getSeasons({
    id: 24
  })
}).then(res => {
  console.log(res)
  tvMaze.getCast({
    id: 24
  })
}).then(res => {
  console.log(res)
  tvMaze.getCrew({
    id: 24
  })
}).then(res => {
  console.log(res)
  tvMaze.getAliases({
    id: 24
  })
}).then(res => {
  console.log(res)
  tvMaze.getPage(1)
}).then(res => {
  console.log(res)
  tvMaze.getPerson({
    id: 24,
    embed: 'episodes'
  })
}).then(res => {
  console.log(res)
  tvMaze.getCastCredits({
    id: 1,
    embed: 'castcredits'
  })
}).then(res => {
  console.log(res)
  tvMaze.showUpdates()
}).then(res => {
  console.log(res)
  tvMaze.getSchedule({
    country: 'US',
    date: '2014-12-01'
  })
}).then(res => {
  console.log(res)
  tvMaze.getFullSchedule({
    id: 24
  })
}).catch(err => console.err(err))
