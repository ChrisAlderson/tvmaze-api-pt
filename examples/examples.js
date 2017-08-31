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
  return tvMaze.getShow(23, 'episodes')
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodes(24, true)
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodeByNumber(24, 1, 1)
}).then(res => {
  console.log(res)
  return tvMaze.getEpisodeByDate(24, '2010-09-20')
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
  return tvMaze.getPerson(24, 'castcredits')
}).then(res => {
  console.log(res)
  return tvMaze.getPeopleCastCredits(1, 'show')
}).then(res => {
  console.log(res)
  return tvMaze.showUpdates()
}).then(res => {
  console.log(res)
  return tvMaze.getSchedule('US', '2014-12-01')
}).then(res => {
  console.log(res)
  return tvMaze.getFullSchedule(24)
}).then(res => console.log(res))
  .catch(err => console.error(err))
