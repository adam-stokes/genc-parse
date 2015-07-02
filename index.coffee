fs = require('fs-extra-promise')
fm = require('fastmatter')
moment = require('moment')
markdown = require('marked')
glob = require('glob-promise')
Promise = require('bluebird')
S = require('string')

class Post
  constructor: (post) ->
    @post = post
    body = fs.readFileSync @post, 'utf-8'
    @matter = fm(body.toString())
    @title = @matter.attributes.title ? "No title defined."
    @permalink = S(@post).slugify().s
    @date = moment(@matter.attributes.date)
    @tags = @matter.attributes.tags ? ['default']
    @author = @matter.attributes.author ? 'Adam Stokes'
    @html = markdown(@matter.body)
  inCat: (cat) ->
    if cat in @tags
      return true
    return false


module.exports = (dir) ->
  return glob("#{dir}/*")
    .then((items) ->
      posts = []
      for post in items
        posts.push new Post(post)
      return Promise.all(posts))
