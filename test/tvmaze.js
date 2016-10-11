"use strict";

const chai = require("chai");
const assert = chai.assert;
const TVMazeAPI = require("../tvmaze-api");

describe("TVMaze", () => {

  let tvMaze, q;
  before(() => {
    tvMaze = new TVMazeAPI();
    q = "Lost";
  });

  it("searchShows", done => {
    tvMaze.searchShows(q).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("searchPeople", done => {
    tvMaze.searchPeople(q).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("singleSearchShow", done => {
    tvMaze.singleSearchShow(q).then(res => {
      assert.isObject(res);
      done();
    }).catch(err => done(err));
  });

  it("lookupShow", done => {
    const tvrage = tvMaze.lookupShow({
      tvrage: 24493
     });
    const thetvdb = tvMaze.lookupShow({
      thetvdb: 81189
     });
    const imdb = tvMaze.lookupShow({
      imdb: "tt0944947"
     });

    Promise.all([tvrage, thetvdb, imdb]).then(res => {
      assert.isObject(res[0]);
      assert.isObject(res[1]);
      assert.isObject(res[2]);
      done();
    }).catch(err => done(err));
  });

  it("getShow", done => {
    tvMaze.getShow({
      id: 24,
      embed: "episodes"
    }).then(res => {
      assert.isObject(res);
      done();
    }).catch(err => done(err));
  });

  it("getEpisodes", done => {
    tvMaze.getEpisodes({
      id: 24,
      specials: true
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getEpisodeByNumber", done => {
    tvMaze.getEpisodeByNumber({
      id: 24,
      season: 1,
      episode: 1
    }).then(res => {
      assert.isObject(res);
      done();
    }).catch(err => done(err));
  });

  it("getEpisodeByDate", done => {
    tvMaze.getEpisodeByDate({
      id: 24,
      date: "2010-09-20"
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getSeasons", done => {
    tvMaze.getSeasons({
      id: 24
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getCast", done => {
    tvMaze.getCast({
      id: 24
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getCrew", done => {
    tvMaze.getCrew({
      id: 24
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getAliases", done => {
    tvMaze.getAliases({
      id: 24
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getPage", done => {
    tvMaze.getPage(1).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getPerson", done => {
    tvMaze.getPerson({
      id: 24,
      embed: "episodes"
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getCastCredits", done => {
    tvMaze.getCastCredits({
      id: 1,
      embed: "castcredits"
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("showUpdates", done => {
    tvMaze.showUpdates().then(res => {
      assert.isObject(res);
      done();
    }).catch(err => done(err));
  });

  it("getSchedule", done => {
    tvMaze.getSchedule({
      country: "US",
      date: "2014-12-01"
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("getFullSchedule", done => {
    tvMaze.getFullSchedule({
      id: 24
    }).then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

});
