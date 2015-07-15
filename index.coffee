fs = require('fs-extra')
fm = require('fastmatter')
moment = require('moment')
markdown = require('marked')
glob = require('glob')
S = require('string')
_ = require('lodash')

class Post
  constructor: (post) ->
    @post = post
    body = fs.readFileSync @post, 'utf-8'
    @matter = fm(body.toString())
    @title = @matter.attributes.title ? "No title defined."
    @layout = @matter.attributes.layout ? "post"
    @permalink = S(@title).slugify().s
    @date = moment(@matter.attributes.date)
    @tags = @matter.attributes.tags ? ['default']
    @author = @matter.attributes.author ? 'Adam Stokes'
    @html = markdown(@matter.body)

setPost = (post) ->
  return new Post(post)

module.exports = (dir) ->
  return _.map(glob.sync("#{dir}"), setPost)
