parse = require('.')

parse('/home/adam/Dropbox/Articles')
  .then((posts) ->
    for post in posts
      console.log post.inCat('ubuntu'))
  .catch((e) ->
    console.error e)
