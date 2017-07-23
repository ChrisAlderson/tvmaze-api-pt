'use strict'

// Import the necessary modules.
const { assert, expect } = require('chai')
const TvMazeApi = require('../tvmaze-api-pt')

/** @test {TvMazeApi} */
describe('TvMazeApi', () => {
  let tvMaze

  let q

  before(() => {
    console.warn = () => {}
    tvMaze = new TvMazeApi({
      debug: true
    })
    q = 'Lost'
  })

  it('should throw an error is there is no id', () => {
    expect(TvMazeApi._checkId)
      .to.throw('undefined is not a valid value for id!')
  })

  /** @test {TVMazeAP#searchShows} */
  it('searchShows', done => {
    tvMaze.searchShows(q).then(res => {
      assert.isArray(res)
      done()
    }).catch(err => done(err))
  })

  /** @test {TVMazeAP#searchShows} */
  it('should throw an error when searching for a show', () => {
    tvMaze = new TvMazeApi()
    expect(tvMaze.searchShows.bind(tvMaze.searchShows, 1))
      .to.throw('1 is not a valid value for q!')
  })

  /** @test {TVMazeAPI#singleSearchShow} */
  it('singleSearchShow', done => {
    tvMaze.singleSearchShow(q, 'episodes').then(res => {
      assert.isObject(res)
      done()
    }).catch(err => done(err))
  })

  /** @test {TVMazeAPI#singleSearchShow} */
  it('singleSearchShow', done => {
    tvMaze.singleSearchShow(q).then(res => {
      assert.isObject(res)
      done()
    }).catch(err => done(err))
  })

  /** @test {TVMazeAPI#singleSearchShow} */
  it('should throw an error when searching for a single show', () => {
    expect(tvMaze.singleSearchShow.bind(tvMaze.singleSearchShow, undefined))
      .to.throw('undefined is not a valid value for q!')
    expect(tvMaze.singleSearchShow.bind(tvMaze.singleSearchShow, 'faulty', 1))
      .to.throw('1 is not a valid value for embed!')
  })

  /** @test {TVMazeAPI#lookupShow} */
  it('lookupShow', done => {
    const tvrage = tvMaze.lookupShow({
      tvrage: 24493
    })
    const thetvdb = tvMaze.lookupShow({
      thetvdb: 81189
    })
    const imdb = tvMaze.lookupShow({
      imdb: 'tt0944947'
    })

    Promise.all([tvrage, thetvdb, imdb]).then(res => {
      assert.isObject(res[0])
      assert.isObject(res[1])
      assert.isObject(res[2])
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#lookupShow} */
  it('should throw an error when looking for a show', () => {
    expect(tvMaze.lookupShow.bind(tvMaze.lookupShow, {}))
      .to.throw('Specify a tvrage, thetvdb or imdb id for this request')
  })

  /** @test {TVMazeAPI#searchPeople} */
  it('searchPeople', done => {
    tvMaze.searchPeople(q).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#searchPeople} */
  it('should throw an error when searching for people', () => {
    expect(tvMaze.searchPeople)
      .to.throw('undefined is not a valid value for q!')
  })

  /** @test {TVMazeAPI#getSchedule} */
  it('getSchedule', done => {
    tvMaze.getSchedule({
      country: 'US',
      date: '2014-12-01'
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getSchedule} */
  it('should throw an error when getting a schedule', () => {
    expect(tvMaze.getSchedule.bind(tvMaze.getSchedule, {
      date: '09-04-2014'
    })).to.throw('09-04-2014 is not a ISO 8601 date!')
  })

  /** @test {TVMazeAPI#getFullSchedule} */
  it('getFullSchedule', done => {
    tvMaze.getFullSchedule({
      id: 24
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getShow} */
  it('getShow', done => {
    tvMaze.getShow(24, 'episodes').then(res => {
      assert.isObject(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getEpisodes} */
  it('getEpisodes', done => {
    tvMaze.getEpisodes({
      id: 24,
      specials: true
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getEpisodes} */
  it('getEpisodes', done => {
    tvMaze.getEpisodes({
      id: 24,
      specials: false
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getEpisodeByNumber} */
  it('getEpisodeByNumber', done => {
    tvMaze.getEpisodeByNumber({
      id: 24,
      season: 1,
      episode: 1
    }).then(res => {
      assert.isObject(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getEpisodeByNumber} */
  it('should throw an error when getting an episode by number', () => {
    expect(tvMaze.getEpisodeByNumber.bind(tvMaze.getEpisodeByNumber, {
      id: 24,
      season: undefined
    })).to.throw('undefined is not a valid value for season!')
    expect(tvMaze.getEpisodeByNumber.bind(tvMaze.getEpisodeByNumber, {
      id: 24,
      season: 1,
      episode: undefined
    })).to.throw('undefined is not a valid value for episode!')
  })

  /** @test {TVMazeAPI#getEpisodeByDate} */
  it('getEpisodeByDate', done => {
    tvMaze.getEpisodeByDate({
      id: 24,
      date: '2010-09-20'
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getEpisodeByDate} */
  it('should throw an error when getting an episode by date', () => {
    expect(tvMaze.getEpisodeByDate.bind(tvMaze.getEpisodeByDate, {
      id: 24,
      date: '20-09-2010'
    })).to.throw('20-09-2010 is not a ISO 8601 date!')
  })

  /** @test {TVMazeAPI#getSeasons} */
  it('getSeasons', done => {
    tvMaze.getSeasons({
      id: 24
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getCast} */
  it('getCast', done => {
    tvMaze.getCast({
      id: 24
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getCrew} */
  it('getCrew', done => {
    tvMaze.getCrew({
      id: 24
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getAliases} */
  it('getAliases', done => {
    tvMaze.getAliases({
      id: 24
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getPage} */
  it('getPage', done => {
    tvMaze.getPage(1).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getPage} */
  it('should throw an error when getting a page', () => {
    expect(tvMaze.getPage.bind(tvMaze.getPage, undefined))
      .to.throw('Page needs to be a number.')
  })

  /** @test {TVMazeAPI#getPeople} */
  it('getPeople', done => {
    tvMaze.getPeople({
      id: 24,
      embed: 'castcredits'
    }).then(res => {
      assert.isObject(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getPeopleCastCredits} */
  it('getPeopleCastCredits', done => {
    tvMaze.getPeopleCastCredits({
      id: 1,
      embed: 'show'
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#getPeopleCredits} */
  it('getPeopleCredits', done => {
    tvMaze.getPeopleCredits({
      id: 1,
      embed: 'show'
    }).then(res => {
      assert.isArray(res)
      done()
    }).catch(done)
  })

  /** @test {TVMazeAPI#showUpdates} */
  it('showUpdates', done => {
    tvMaze.showUpdates().then(res => {
      assert.isObject(res)
      done()
    }).catch(done)
  })
})
