'use strict'

// Import the necessary modules.
const { expect } = require('chai')
const TvMazeApi = require('../tvmaze-api-pt')

/** @test {TvMazeApi} */
describe('TvMazeApi', () => {
  /**
   * The TvMazeApi instance.
   * @type {TvMazeApi}
   */
  let tvMaze

  /**
   * The query to search for.
   * @type {string}
   */
  let q

  /**
   * Hook for setting up the TvMazeApi tests.
   * @type {Function}
   */
  before(() => {
    console.warn = () => {}
    tvMaze = new TvMazeApi({
      debug: true
    })
    q = 'Lost'
  })

  /** @test {TvMazeApi._checkId} */
  it('should throw an error is there is no id', () => {
    expect(TvMazeApi._checkId)
      .to.throw('undefined is not a valid value for id!')
  })

  /** @test {TvMazeApi#searchShows} */
  it('should search for shows', done => {
    tvMaze.searchShows(q).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(err => done(err))
  })

  /** @test {TvMazeApi#searchShows} */
  it('should throw an error when searching for a show', () => {
    tvMaze = new TvMazeApi()
    expect(tvMaze.searchShows.bind(tvMaze.searchShows, 1))
      .to.throw('1 is not a valid value for q!')
  })

  /** @test {TvMazeApi#singleSearchShow} */
  it('should search for a single show with episodes', done => {
    tvMaze.singleSearchShow(q, 'episodes').then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(err => done(err))
  })

  /** @test {TvMazeApi#singleSearchShow} */
  it('should search for a single show without episodes', done => {
    tvMaze.singleSearchShow(q).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(err => done(err))
  })

  /** @test {TvMazeApi#singleSearchShow} */
  it('should throw an error when searching for a single show', () => {
    expect(tvMaze.singleSearchShow.bind(tvMaze.singleSearchShow, undefined))
      .to.throw('undefined is not a valid value for q!')
    expect(tvMaze.singleSearchShow.bind(tvMaze.singleSearchShow, 'faulty', 1))
      .to.throw('1 is not a valid value for embed!')
  })

  /** @test {TvMazeApi#lookupShow} */
  it('should lookup a show', done => {
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
      expect(res).to.be.an('array')
      res.map(r => expect(r).to.be.an('object'))
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#lookupShow} */
  it('should throw an error when looking for a show', () => {
    expect(tvMaze.lookupShow.bind(tvMaze.lookupShow, {}))
      .to.throw('Specify a tvrage, thetvdb or imdb id for this request')
  })

  /** @test {TvMazeApi#searchPeople} */
  it('should search for people', done => {
    tvMaze.searchPeople(q).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#searchPeople} */
  it('should throw an error when searching for people', () => {
    expect(tvMaze.searchPeople)
      .to.throw('undefined is not a valid value for q!')
  })

  /** @test {TvMazeApi#getSchedule} */
  it('should get a schedule of to be aired shows', done => {
    tvMaze.getSchedule('US', '2014-12-01').then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getSchedule} */
  it('should throw an error when getting a schedule', () => {
    expect(tvMaze.getSchedule.bind(tvMaze.getSchedule, 'US', '09-04-2014'))
      .to.throw('09-04-2014 is not a ISO 8601 date!')
  })

  /** @test {TvMazeApi#getFullSchedule} */
  it('should get a full schedule', done => {
    tvMaze.getFullSchedule(24).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getShow} */
  it('should get a show with the episodes', done => {
    tvMaze.getShow(24, 'episodes').then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodes} */
  it('should get a list of episodes, with the specials', done => {
    tvMaze.getEpisodes(24, true).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodes} */
  it('should get a list of episodes, without the specials', done => {
    tvMaze.getEpisodes(24, false).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByNumber} */
  it('should get an episode by number', done => {
    tvMaze.getEpisodeByNumber(24, 1, 1).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByNumber} */
  it('should throw an error when getting an episode by number', () => {
    expect(
      tvMaze.getEpisodeByNumber.bind(tvMaze.getEpisodeByNumber, 24, undefined
      )).to.throw('undefined is not a valid value for season!')
    expect(
      tvMaze.getEpisodeByNumber.bind(tvMaze.getEpisodeByNumber,
        24,
        1,
        undefined
      )).to.throw('undefined is not a valid value for episode!')
  })

  /** @test {TvMazeApi#getEpisodeByDate} */
  it('should get an episode by date', done => {
    tvMaze.getEpisodeByDate(24, '2010-09-20').then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByDate} */
  it('should throw an error when getting an episode by date', () => {
    expect(
      tvMaze.getEpisodeByDate.bind(tvMaze.getEpisodeByDate, 24, '20-09-2010'
      )).to.throw('20-09-2010 is not a ISO 8601 date!')
  })

  /** @test {TvMazeApi#getSeasons} */
  it('should get the seasons of a show', done => {
    tvMaze.getSeasons(24).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getCast} */
  it('should get the cast of a show', done => {
    tvMaze.getCast(24).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getCrew} */
  it('should get the crew members of a show', done => {
    tvMaze.getCrew(24).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getAliases} */
  it('should get a list of aliases of a show', done => {
    tvMaze.getAliases(24).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPage} */
  it('should get a list of shows', done => {
    tvMaze.getPage(1).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPage} */
  it('should throw an error when getting a page', () => {
    expect(tvMaze.getPage)
      .to.throw('Page needs to be a number.')
  })

  /** @test {TvMazeApi#getPerson} */
  it('should get a person', done => {
    tvMaze.getPerson(24, 'castcredits').then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPeopleCastCredits} */
  it('should get the cast credits of a show', done => {
    tvMaze.getPeopleCastCredits(1, 'show').then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPeopleCrewCredits} */
  it('should get the crew credits of a show', done => {
    tvMaze.getPeopleCrewCredits(1, 'show').then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#showUpdates} */
  it('should list the show update times', done => {
    tvMaze.showUpdates().then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })
})
