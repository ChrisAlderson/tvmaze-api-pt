// Import the necessary modules.
const debug = require('debug')
const got = require('got')
const { stringify } = require('querystring')

const { name } = require('./package')

/**
 * The images model.
 * @typedef {Object} Images
 * @property {string} medium The medium image.
 * @property {string} original The original image.
 */

/**
 * The externals model.
 * @typedef {Object} Externals
 * @property {number} tvrage The tvrage of the show.
 * @property {number} thetvdb The thetvdb of the show.
 * @property {string} imdb The imdb of the show.
 */

/**
 * The country model.
 * @typedef {Object} Country
 * @property {string} name The name of the country.
 * @property {string} code The code of the country.
 * @property {string} timezone The timezone of the country.
 */

/**
 * The network model.
 * @typedef {Object} Network
 * @property {number} id The id of the network.
 * @property {string} name The name of the network.
 * @property {Country} country The country of the network.
 */

/**
 * The rating model.
 * @typedef {Object} Rating
 * @property {number} average The average of the rating.
 */

/**
 * The show schedule model.
 * @typedef {Object} ShowSchedule
 * @property {string} time The time of the show schedule.
 * @property {Array<string>} days The days of the show schedule.
 */

/**
 * The show model.
 * @typedef {Object} Show
 * @property {number} id The id of the show.
 * @property {string} url The url of the show.
 * @property {string} name The name of the show.
 * @property {string} type The type of the show.
 * @property {string} language The language of the show.
 * @property {Array<string>} genres The genres of the show.
 * @property {string} status The status of the show.
 * @property {number} runtime The runtime of the show.
 * @property {string} premiered The premiered of the show.
 * @property {string} officialSite The officialSite of the show.
 * @property {ShowSchedule} schedule The schedule of the show.
 * @property {Rating} rating The rating of the show.
 * @property {number} weight The weight of the show.
 * @property {Network} network The network of the show.
 * @property {string} webChannel The webChannel of the show.
 * @property {Externals} externals The externals of the show.
 * @property {Images} image The image of the show.
 * @property {string} summary The summary of the show.
 * @property {number} updated The updated of the show.
 */

/**
 * The episode model.
 * @typedef {Object} Episode
 * @property {number} id The id of the episode.
 * @property {string} url The url of the episode.
 * @property {string} name The name of the episode.
 * @property {number} season The season of the episode.
 * @property {number} number The number of the episode.
 * @property {string} airdate The airdate of the episode.
 * @property {string} airtime The airtime of the episode.
 * @property {string} airstamp The airstamp of the episode.
 * @property {string} runtime The runtime of the episode.
 * @property {Images} image The image of the episode.
 * @property {string} summary The summary of the episode.
 */

/**
 * The schedule model.
 * @typedef {Episode} Schedule
 * @property {number} id The id of the schedule.
 * @property {string} url The url of the schedule.
 * @property {string} name The name of the schedule.
 * @property {number} season The season of the schedule.
 * @property {number} number The number of the schedule.
 * @property {string} airdate The airdate of the schedule.
 * @property {string} airtime The airtime of the schedule.
 * @property {string} airstamp The airstamp of the schedule.
 * @property {string} runtime The runtime of the schedule.
 * @property {Images} image The image of the schedule.
 * @property {string} summary The summary of the schedule.
 * @property {Show} show The show of the schedule.
 */

/**
 * The season model.
 * @typedef {Object} Season
 * @property {number} id The id of the season.
 * @property {string} url The url of the season.
 * @property {number} number The number of the season.
 * @property {string} name The name of the season.
 * @property {number} episodeOrder The episodeOrder of the season.
 * @property {string} premiereDate The premiereDate of the season.
 * @property {string} endDate The endDate of the season.
 * @property {Network} network The network of the season.
 * @property {string} webChannel The webChannel of the season.
 * @property {Images} image The image of the season.
 * @property {string} summary The summary of the season.
 * @property {Images} image The image of the season.
 */

/**
 * The person model.
 * @typedef {Object} Person
 * @property {number} id The id of the season.
 * @property {string} url The url of the season.
 * @property {string} name The name of the season.
 * @property {Images} image The image of the schedule.
 */

/**
 * The cast model.
 * @typedef {Object} Cast
 * @property {Person} person The person of the cast.
 * @property {Person} character The character of the cast.
 */

/**
 * The crew model.
 * @typedef {Object} Crew
 * @property {string} type - The type of crew.
 * @property {Person} person - The person of the crew.
 */

/**
 * The people model.
 * @typedef {Object} People
 * @property {number} score - The score of the people.
 * @property {Person} person - The person of the response.
 */

/**
 * The alias model.
 * @typedef {Object} Alias
 * @property {string} name The name of the alias.
 * @property {Country} country The country of the alias.
 */

/**
 * A TvMaze API wrapper for NodeJS.
 * @type {TvMazeApi}
 */
module.exports = class TvMazeApi {

  /**
   * Create a new instance of the module.
   * @param {!Object} config={} - The configuration object for the module.
   * @param {!string} baseUrl=https://api.tvmaze.com/ - The base url of tvmaze.
   */
  constructor({baseUrl = 'https://api.tvmaze.com/'} = {}) {
    /**
     * The base url of eztv.
     * @type {string}
     */
    this._baseUrl = baseUrl
    /**
     * Show extra output.
     * @type {Function}
     */
    this._debug = debug(name)
    /**
     * Regex for checking iso8601 dates.
     * @type {RegExp}
     */
    this._iso8601 = /\d{4}-\d{2}-\d{2}/
  }

  /**
   * Check if the id exists.
   * @throws {Error} - ID is not a valid value for id!
   * @param {!number} id - The id to check.
   * @returns {undefined}
   */
  _checkId(id) {
    if (!id) {
      throw new Error(`${id} is not a valid value for id!`)
    }
  }

  /**
   * Send a GET request to the TvMaze API.
   * @param {!string} endpoint - The endpoint of the API to send the request
   * to.
   * @param {?Object} [query={}] - The query to send with the GET request.
   * @returns {Promise<Object, Error>} - The promise to send a GET request
   * to the TvMaze API.
   */
  _get(endpoint, query = {}) {
    const uri = `${this._baseUrl}${endpoint}`
    this._debug(`Making request to: '${uri}?${stringify(query)}'`)

    return got.get(uri, {
      query,
      json: true
    }).then(({ body }) => body)
  }

  /**
   * Send a GET request to the TvMaze API.
   * @param {!string} endpoint - The endpoint of the API to send the request
   * to.
   * @param {!number} id - The id of the movie/show to get.
   * @param {?string} embed - Objects to embed with the response.
   * @returns {Promise<Object, Error>} - The promise to send a GET request
   * to the TvMaze API.
   */
  _getWithEmbed(endpoint, id, embed) {
    this._checkId(id)
    return this._get(endpoint, { embed })
  }

  /**
   * Search for a show based on a query.
   * @param {!string} q - The query to search for.
   * @returns {Promise<Array<Show>, Error>} - The promise to search for a
   * show.
   */
  searchShows(q) {
    if (q && typeof q !== 'string') {
      throw new Error(`${q} is not a valid value for q!`)
    }

    return this._get('search/shows', { q })
  }

  /**
   * Search for a single show based on a query.
   * @param {!Object} config - The config object for the method.
   * @param {!string} config.q - The query to search for.
   * @param {?string} config.embed - Objects to embed with the response.
   * @returns {Promise<Show, Error>} - The promise to search for a single
   * show.
   */
  singleSearchShow({q, embed}) {
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

  /**
   * Lookup a show based on a tvrage, thetvdb or imdb id.
   * @param {!Object} config - The config object for the method.
   * @param {?number} config.tvrage - The tvrage id to lookup.
   * @param {?number} config.thetvdb - The thetvdb id to lookup.
   * @param {?string} config.imdb - The imdb id to lookup.
   * @returns {Promise<Show, Error>} - The promise to lookup a show.
   */
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

  /**
   * Search for people based on a query.
   * @param {!string} q - The query to search for.
   * @returns {Promise<Array<Person>, Error>} - The promise to search for
   * people.
   */
  searchPeople(q) {
    if (!q) {
      throw new Error(`${q} is not a valid value for q!`)
    }

    return this._get('search/people', { q })
  }

  /**
   * Get a schedule based on a country and date.
   * @param {!Object} config - The config object for the method.
   * @param {?string} config.country - The country of the schedule to get.
   * @param {?string} config.date - The ISO 8601 date of the schedule ot get.
   * @returns {Promise<Array<Schedule>, Error>} - The promise to get a shedule.
   */
  getSchedule({country, date}) {
    if (date && !date.match(this._iso8601)) {
      throw new Error(`${date} is not a ISO 8601 date!`)
    }

    return this._get('schedule', {
      country,
      date
    })
  }

  /**
   * Get the full schedule.
   * @returns {Promise<Array<Schedule>, Error>} - The promise to get a full
   * schedule.
   */
  getFullSchedule() {
    return this._get(`schedule/full`)
  }

  /**
   * Get a show based on the id.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show to get.
   * @param {?string} config.embed - Objects to embed with the response.
   * @returns {Promise<Show, Error>} - The promise to get a show.
   */
  getShow({id, embed}) {
    return this._getWithEmbed(`shows/${id}`, id, embed)
  }

  /**
   * Get a list of epiodes of a show.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show.
   * @param {?boolean} config.specials - Include the special episodes.
   * @returns {Promise<Array<Episode>, Episode>} - The promise to get a list
   * of episodes of a show.
   */
  getEpisodes({id, specials}) {
    this._checkId(id)

    return this._get(`shows/${id}/episodes`, {
      specials: specials ? 1 : 0
    })
  }

  /**
   * Get an episode by the id, season and episode number.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show.
   * @param {!number} config.season - The season of the show.
   * @param {!number} config.episode - The episode of the season.
   * @returns {Promise<Episode, Error>} - The promise to get an episode by
   * number.
   */
  getEpisodeByNumber({id, season, episode}) {
    this._checkId(id)
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

  /**
   * Get episodes by id and date.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show.
   * @param {!string} config.date - A ISO 8601 date string.
   * @returns {Promise<Array<Episode>, Error>} - The promise to get a list of
   * episode by date.
   */
  getEpisodeByDate({id, date}) {
    this._checkId(id)
    if (date && !date.match(this._iso8601)) {
      throw new Error(`${date} is not a ISO 8601 date!`)
    }

    return this._get(`shows/${id}/episodesbydate`, { date })
  }

  /**
   * Get the seasons of a show.
   * @param {!number} id - The id of the show.
   * @returns {Promise<Array<Season>, Error>} - The promise to get a list of
   * seasons.
   */
  getSeasons(id) {
    this._checkId(id)
    return this._get(`shows/${id}/seasons`)
  }

  /**
   * Get a list of cast members of a show.
   * @param {!number} id - The id of the show.
   * @returns {Promise<Array<Cast>, Error>} - The promise to get a list of
   * cast members.
   */
  getCast(id) {
    this._checkId(id)
    return this._get(`shows/${id}/cast`)
  }

  /**
   * Get a list of the crew of a show.
   * @param {!number} id - The id of the show.
   * @returns {Promise<Array<Crew>, Error>} - The promise to get a list of
   * crew members.
   */
  getCrew(id) {
    this._checkId(id)
    return this._get(`shows/${id}/crew`)
  }

  /**
   * Get a list of aliases for a show.
   * @param {!number} id - The id of the show.
   * @returns {Promise<Array<Alias>, Error>} - The promise to get a list of
   * aliasses of a show.
   */
  getAliases(id) {
    this._checkId(id)
    return this._get(`shows/${id}/akas`)
  }

  /**
   * Get a page of shows.
   * @param {!number} page - The page of show to get.
   * @returns {Promise<Array<Show>, Error>} - The promise to get a list of
   * shows.
   */
  getPage(page) {
    if (!page || typeof (page) !== 'number') {
      throw new Error(`Page needs to be a number.`)
    }

    return this._get('shows', { page })
  }

  /**
   * Get a person based on the id.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the person to get.
   * @param {?string} config.embed - Object to embed with the response.
   * @returns {Promise<Person, Error>} - The promise to get a person.
   */
  getPerson({id, embed}) {
    return this._getWithEmbed(`people/${id}`, id, embed)
  }

  /**
   * Get the cast of a show.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show.
   * @param {?string} config.embed - Object to embed with the response.
   * @returns {Promise<Object, Error>} - The promise to get the cast of a
   * show.
   */
  getCastCredits({id, embed}) {
    return this._getWithEmbed(`people/${id}/castcredits`, id, embed)
  }

  /**
   * Get the crew of a show.
   * @param {!Object} config - The config object for the method.
   * @param {!number} config.id - The id of the show.
   * @param {?string} config.embed - Object to embed with the response.
   * @returns {Promise<Object, Error>} - The promise to get the crew of a
   * show.
   */
  getCrewCredits({id, embed}) {
    return this._getWithEmbed(`people/${id}/crewcredits`, id, embed)
  }

  /**
   * Get when the shows where updated.
   * @returns {Promise<Object, Error>} - A list of show ids and the time when
   * they where last updated.
   */
  showUpdates() {
    return this._get('updates/shows')
  }

}
