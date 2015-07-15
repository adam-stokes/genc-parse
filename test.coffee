parse = require('.')
_ = require('lodash')

TESTDIR = '/home/adam/Dropbox/Articles/*'
files = parse(TESTDIR)
_.each(files, (f) -> console.log f.title)
