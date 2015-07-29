"use strict";

var co = require("co");
var parse = require(".");
var _ = require("lodash");

var TESTDIR = "/home/adam/Dropbox/Articles";

co(function*() {
    return yield parse(TESTDIR);
}).then(function(posts) {
    _.each(posts, function(p){ console.log("%s - %s", p.date, p.title); });
    return;
}).catch(function(e) {
    console.log(e);
});
