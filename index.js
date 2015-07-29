"use strict";
var fs = require("mz/fs");
var fm = require("fastmatter");
var moment = require("moment");
var markdown = require("marked");
var string = require("string");
var _ = require("lodash");
var debug = require("debug")("genc:parse");
var join = require("path").join;

module.exports = function(source) {
    return fs.readdir(source)
        .then(function(files) {
            var out = [];
            _.each(files, function(f) {
                var body = fs.readFileSync(join(source, f), "utf8");
                var matter = fm(body.toString());
                debug(matter.attributes);
                var meta = {
                    body: markdown(matter.body),
                    date: moment(matter.attributes.date),
                    filename: join(source, f)
                };
                _.merge(meta, matter.attributes);
                var noPermalink = meta.permalink === undefined;
                if (noPermalink) {
                    _.merge(meta, {
                        permalink: string(matter.attributes.title).slugify().s
                    });
                }
                var noTemplate = meta.tempalte === undefined;
                if (noTemplate){
                    _.merge(meta, {
                        template: "post.jade"
                    });
                }
                out.push(meta);
            });
            return _.sortByOrder(out, ["date"], ["desc"]);
        });
};
