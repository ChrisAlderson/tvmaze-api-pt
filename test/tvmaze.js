"use strict";

const chai = require("chai");
const assert = chai.assert;
const TVMazeAPI = require("../tvmaze-api");

describe("TVMaze", () => {

  let tvMaze, data;
  before(() => {
    tvMaze = new TVMazeAPI();
    data = {

    };
  });

  it("searchShows", done => {
    tvMaze.searchShows().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("searchPeople", done => {
    tvMaze.searchPeople().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("singleSearchShow", done => {
    tvMaze.singleSearchShow().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("lookupShow", done => {
    tvMaze.lookupShow().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getShow", done => {
    tvMaze.getShow().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getEpisodes", done => {
    tvMaze.getEpisodes().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getEpisodeByNumber", done => {
    tvMaze.getEpisodeByNumber().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getEpisodeByDate", done => {
    tvMaze.getEpisodeByDate().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getSeasons", done => {
    tvMaze.getSeasons().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getCast", done => {
    tvMaze.getCast().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getCrew", done => {
    tvMaze.getCrew().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getAliases", done => {
    tvMaze.getAliases().then(res => {
      // do something
    }).catch(err => done(err));
  });

  it("getPage", done => {
    tvMaze.getPage().then(res => {
        // something
      }).catch(err => done(err));
  });

  it("getPerson", done => {
    tvMaze.getPerson().then(res => {
        // something
      }).catch(err => done(err));
  });

  it("getCastCredits", done => {
    tvMaze.getCastCredits().then(res => {
        // something
      }).catch(err => done(err));
  });

  it("showUpdates", done => {
    tvMaze.showUpdates().then(res => {
        // something
      }).catch(err => done(err));
  });

  it("getSchedule", done => {
    tvMaze.getSchedule().then(res => {
        // something
      }).catch(err => done(err));
  });

  it("getFullSchedule", done => {
    tvMaze.getFullSchedule().then(res => {
        // something
      }).catch(err => done(err));
  });

});
