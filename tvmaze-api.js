"use strict";

const request = require("request");
const querystring = require("querystring");

const defaultOptions = {
  baseUrl: "http://api.tvmaze.com/",
  timeout: 4 * 1000
};

module.exports = class TVMazeAPI {

  constructor({options = defaultOptions, debug = false} = {}) {
    this._request = request.defaults(options);
    this._debug = debug;

    this._iso8601 = /\d{4}-\d{2}-\d{2}/;
  }

  _get(uri, qs, retry = true) {
    if (this._debug) console.warn(`Making request to uri: ${uri}, qs: '${querystring.stringify(qs)}'`);
    return new Promise((resolve, reject) => {
      return this._request({ uri, qs }, (err, res, body) => {
        if (err && retry) {
          return resolve(this._get(uri, qs, false));
        } else if (err) {
          return reject(err);
        } else if (!body || res.statusCode >= 400) {
          return reject(new Error(`No data found for uri: ${uri}, qs: '${querystring.stringify(qs)}', statuscode: ${res.statusCode}`))
        } else {
          return resolve(JSON.parse(body));
        }
      });
    });
  }

  searchShows(q) {
    if (!q) throw new Error(`${q} is not a valid value for q!`);
    return this._get("/search/shows", { q });
  }

  searchPeople(q) {
    if (!q) throw new Error(`${q} is not a valid value for q!`);
    return this._get("/search/people", { q });
  }

  singleSearchShow(q) {
    if (!q) throw new Error(`${q} is not a valid value for q!`);
    return this._get("/singlesearch/shows", { q });
  }

  lookupShow({tvrage, thetvdb, imdb}) {
    if (!tvrage && !thetvdb && !imdb) throw new Error("Specify a tvrage, thetvdb or imdb id for this request");
    return this._get("lookup/shows", { tvrage, thetvdb, imdb });
  }

  getShow({id, embed}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`shows/${id}`, { embed });
  }

  getEpisodes({id, specials}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    specials = specials ? 1 : 0;
    return this._get(`shows/${id}/episodes`, { specials });
  }

  getEpisodeByNumber({id, season, episode}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    if (!season) throw new Error(`${season} is not a valid value for season!`);
    if (!episode) throw new Error(`${episode} is not a valid value for episode!`);
    return this._get(`shows/${id}/episodebynumber`, { season, number: episode });
  }

  getEpisodeByDate({id, date}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    if (!date.match(this._iso8601)) throw new Error(`${date} is not a ISO 8601 date`);
    return this._get(`shows/${id}/episodesbydate`, { date });
  }

  getSeasons({id}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`shows/${id}/seasons`);
  }

  getCast({id}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`shows/${id}/cast`);
  }

  getCrew({id}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`shows/${id}/crew`);
  }

  getAliases({id}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`shows/${id}/akas`);
  }

  getPage(page) {
    if (!page || typeof(page) !== "number") throw new Error(`Page needs to be a number.`);
    return this._get("shows", { page });
  }

  getPerson({id, embed}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`people/${id}/castcredits`, { embed });
  }

  getCastCredits({id, embed}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`people/${id}/crewcredits`, { embed });
  }

  showUpdates() {
    return this._get("updates/shows");
  }

  getSchedule({country, date}) {
    if (date && !date.match(this._iso8601)) throw new Error(`${date} is not a ISO 8601 date`);
    return this._get("schedule", { country, date });
  }

  getFullSchedule({id}) {
    if (!id) throw new Error(`${id} is not a valid value for id!`);
    return this._get(`schedule/full`);
  }

}
