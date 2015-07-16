"use strict";

var co = require("co");
var parse = require(".");
var _ = require("lodash");

var TESTDIR = "/home/adam/Dropbox/Articles";

co(function*() {
    return yield parse(TESTDIR);
}).then(function(posts) {
    console.log(_.first(posts));
}).catch(function(e) {
    console.log(e);
});
