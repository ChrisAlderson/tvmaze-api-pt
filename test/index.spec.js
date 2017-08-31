// Import the necessary modules.
const { expect } = require('chai')

const TvMazeApi = require('..')

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
   * The id to search for.
   * @type {number}
   */
  let id

  /**
   * Hook for setting up the TvMazeApi tests.
   * @type {Function}
   */
  before(() => {
    tvMaze = new TvMazeApi()
    q = 'Lost'
    id = 24
  })

  /** @test {TvMazeApi._checkId} */
  it('should throw an error is there is no id', () => {
    expect(tvMaze._checkId)
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
    tvMaze.singleSearchShow({
      q,
      embed: 'episodes'
    }).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(err => done(err))
  })

  /** @test {TvMazeApi#singleSearchShow} */
  it('should search for a single show without episodes', done => {
    tvMaze.singleSearchShow({ q }).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(err => done(err))
  })

  /** @test {TvMazeApi#singleSearchShow} */
  it('should throw an error when searching for a single show', () => {
    expect(tvMaze.singleSearchShow.bind(tvMaze, {}))
      .to.throw('undefined is not a valid value for q!')
    expect(tvMaze.singleSearchShow.bind(tvMaze, {
      q: 'faulty',
      embed: 1
    })).to.throw('1 is not a valid value for embed!')
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
    expect(tvMaze.lookupShow.bind(tvMaze, {}))
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
    tvMaze.getSchedule({
      country: 'US',
      date: '2014-12-01'
    }).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getSchedule} */
  it('should throw an error when getting a schedule', () => {
    expect(tvMaze.getSchedule.bind(tvMaze, {
      country: 'US',
      date: '09-04-2014'
    })).to.throw('09-04-2014 is not a ISO 8601 date!')
  })

  /** @test {TvMazeApi#getFullSchedule} */
  it('should get a full schedule', done => {
    tvMaze.getFullSchedule(id).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getShow} */
  it('should get a show with the episodes', done => {
    tvMaze.getShow({
      id,
      embed: 'episodes'
    }).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodes} */
  it('should get a list of episodes, with the specials', done => {
    tvMaze.getEpisodes({
      id,
      specials: true
    }).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodes} */
  it('should get a list of episodes, without the specials', done => {
    tvMaze.getEpisodes({
      id,
      sepcials: false
    }).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByNumber} */
  it('should get an episode by number', done => {
    tvMaze.getEpisodeByNumber({
      id,
      season: 1,
      episode: 1
    }).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByNumber} */
  it('should throw an error when getting an episode by number', () => {
    expect(tvMaze.getEpisodeByNumber.bind(tvMaze, {
      id,
      seaon: undefined,
      episode: undefined
    })).to.throw('undefined is not a valid value for season!')
    expect(tvMaze.getEpisodeByNumber.bind(tvMaze, {
      id,
      season: 1,
      episode: undefined
    })).to.throw('undefined is not a valid value for episode!')
  })

  /** @test {TvMazeApi#getEpisodeByDate} */
  it('should get an episode by date', done => {
    tvMaze.getEpisodeByDate({
      id,
      date: '2010-09-20'
    }).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getEpisodeByDate} */
  it('should throw an error when getting an episode by date', () => {
    expect(tvMaze.getEpisodeByDate.bind(tvMaze, {
      id,
      date: '20-09-2010'
    })).to.throw('20-09-2010 is not a ISO 8601 date!')
  })

  /** @test {TvMazeApi#getSeasons} */
  it('should get the seasons of a show', done => {
    tvMaze.getSeasons(id).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getCast} */
  it('should get the cast of a show', done => {
    tvMaze.getCast(id).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getCrew} */
  it('should get the crew members of a show', done => {
    tvMaze.getCrew(id).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getAliases} */
  it('should get a list of aliases of a show', done => {
    tvMaze.getAliases(id).then(res => {
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
    tvMaze.getPerson({
      id,
      embed: 'castcredits'
    }).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPeopleCastCredits} */
  it('should get the cast credits of a show', done => {
    tvMaze.getCastCredits({
      id,
      embed: 'show'
    }).then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /** @test {TvMazeApi#getPeopleCrewCredits} */
  it('should get the crew credits of a show', done => {
    tvMaze.getCrewCredits({
      id,
      embed: 'show'
    }).then(res => {
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
