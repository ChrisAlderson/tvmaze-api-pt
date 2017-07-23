'use strict'

const got = require('got')
const { stringify } = require('querystring')

/**
 * A TVMaze API wrapper for NodeJS.
 * @type {TvMazeAPI}
 */
module.exports = class TvMazeAPI {

  /**
   * Create a new instance of the module.
   * @param {!Object} config={} - The configuration object for the module.
   * @param {!string} baseUrl=https://api.tvmaze.com/ - The base url of tvmaze.
   * @param {?boolean} [debug=false] - Show extra output.
   */
  constructor({baseUrl = 'http://api.tvmaze.com/', debug = false} = {}) {
    /**
     * The base url of eztv.
     * @type {string}
     */
    this._baseUrl = baseUrl

    /**
     * Show extra output.
     * @type {boolean}
     */
    this._debug = debug

    /**
     * Regex for checking iso8601 dates.
     * @type {RegExp}
     */
    TvMazeAPI._iso8601 = /\d{4}-\d{2}-\d{2}/
  }

  static _checkId(id) {
    if (!id) {
      throw new Error(`${id} is not a valid value for id!`)
    }
  }

  _get(endpoint, query = {}) {
    const uri = `${this._baseUrl}${endpoint}`

    if (this._debug) {
      console.warn(`Making request to: '${uri}?${stringify(query)}'`)
    }

    return got.get(uri, {
      query,
      json: true
    }).then(({body}) => body)
  }

  searchShows(q) {
    if (q && typeof q !== 'string') {
      throw new Error(`${q} is not a valid value for q!`)
    }

    return this._get('search/shows', { q })
  }

  singleSearchShow(q, embed) {
    if (!q) {
      throw new Error(`${q} is not a valid value for q!`)
    }
    if (embed && typeof embed !== 'string') {
      throw new Error(`${embed} is not a valid value for embed!`)
    }

    const query = { q }
    if (embed) {
      query.embed = embed
    }

    return this._get('singlesearch/shows', query)
  }

  lookupShow({tvrage, thetvdb, imdb}) {
    if (!tvrage && !thetvdb && !imdb) {
      throw new Error('Specify a tvrage, thetvdb or imdb id for this request')
    }

    return this._get('lookup/shows', {
      tvrage,
      thetvdb,
      imdb
    })
  }

  searchPeople(q) {
    if (!q) {
      throw new Error(`${q} is not a valid value for q!`)
    }

    return this._get('search/people', { q })
  }

  getSchedule({country, date}) {
    if (date && !date.match(TvMazeAPI._iso8601)) {
      throw new Error(`${date} is not a ISO 8601 date!`)
    }

    return this._get('schedule', {
      country,
      date
    })
  }

  getFullSchedule() {
    return this._get(`schedule/full`)
  }

  getShow(id, embed) {
    TvMazeAPI._checkId(id)
    return this._get(`shows/${id}`, { embed })
  }

  getEpisodes({id, specials}) {
    TvMazeAPI._checkId(id)
    specials = specials ? 1 : 0

    return this._get(`shows/${id}/episodes`, { specials })
  }

  getEpisodeByNumber({id, season, episode}) {
    TvMazeAPI._checkId(id)
    if (!season) {
      throw new Error(`${season} is not a valid value for season!`)
    }
    if (!episode) {
      throw new Error(`${episode} is not a valid value for episode!`)
    }

    return this._get(`shows/${id}/episodebynumber`, {
      season,
      number: episode
    })
  }

  getEpisodeByDate({id, date}) {
    TvMazeAPI._checkId(id)
    if (!date.match(TvMazeAPI._iso8601)) {
      throw new Error(`${date} is not a ISO 8601 date!`)
    }

    return this._get(`shows/${id}/episodesbydate`, { date })
  }

  getSeasons({id}) {
    TvMazeAPI._checkId(id)
    return this._get(`shows/${id}/seasons`)
  }

  getCast({id}) {
    TvMazeAPI._checkId(id)
    return this._get(`shows/${id}/cast`)
  }

  getCrew({id}) {
    TvMazeAPI._checkId(id)
    return this._get(`shows/${id}/crew`)
  }

  getAliases({id}) {
    TvMazeAPI._checkId(id)
    return this._get(`shows/${id}/akas`)
  }

  getPage(page) {
    if (!page || typeof (page) !== 'number') {
      throw new Error(`Page needs to be a number.`)
    }

    return this._get('shows', { page })
  }

  getPeople({id, embed}) {
    TvMazeAPI._checkId(id)
    return this._get(`people/${id}`, { embed })
  }

  getPeopleCastCredits({id, embed}) {
    TvMazeAPI._checkId(id)
    return this._get(`people/${id}/castcredits`, { embed })
  }

  getPeopleCredits({id, embed}) {
    TvMazeAPI._checkId(id)
    return this._get(`people/${id}/crewcredits`, { embed })
  }

  showUpdates() {
    return this._get('updates/shows')
  }

}
