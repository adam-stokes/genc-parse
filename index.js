"use strict";
var fs = require("mz/fs");
var fm = require("fastmatter");
var moment = require("moment");
var markdown = require("marked");
var string = require("string");
var _ = require("lodash");
var debug = require("debug")("genc:parser");
var assert = require("assert");
var join = require("path").join;

module.exports = function(source) {
    assert(source, "Must pass a source location.");
    debug("Parsing %s", source);
    return fs.readdir(source)
        .then(function(files) {
            var out = [];
            _.each(files, function(f) {
                debug("Processing: %s", f);
                var body = fs.readFileSync(join(source, f), "utf8");
                var matter = fm(body.toString());
                debug(matter.attributes);
                var meta = {
                    title: matter.attributes.title || "No title defined.",
                    layout: matter.attributes.layout || "post",
                    permalink: string(matter.attributes.title).slugify().s,
                    date: moment(matter.attributes.date),
                    tags: matter.attributes.tags || ["default"],
                    author: matter.attributes.author || "Incognito blogerito",
                    html: markdown(matter.body)
                };
                out.push(meta);
            });
            return out;
        });
};
