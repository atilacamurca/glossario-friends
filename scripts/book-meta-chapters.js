var vfile = require('to-vfile')
// var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('remark-parse')
var stringify = require('remark-stringify')
var frontmatter = require('remark-frontmatter')
const path = require('path')
const { cwd } = require('process')
var remark = require('remark')
const find = require('lodash.find')
const yaml = require('js-yaml')
const padStart = require('lodash.padstart')
const mkdirp = require('mkdirp')
const fs = require('fs')

const temporadas = {
  '1': {
    part: 'Um',
    total: 24
  },
  '2': {
    part: 'Dois',
    total: 24
  },
  '3': {
    part: 'Três',
    total: 25
  },
  '4': {
    part: 'Quatro',
    total: 24
  },
  '5': {
    part: 'Cinco',
    total: 24
  },
  '6': {
    part: 'Seis',
    total: 25
  },
  '7': {
    part: 'Sete',
    total: 24
  },
  '8': {
    part: 'Oito',
    total: 24
  },
  '9': {
    part: 'Nove',
    total: 24
  },
  '10': {
    part: 'Dez',
    total: 18
  },
}

const ep = readEpisode(1, 1)
generateTemporada(ep.temporada, `\\part{Temporada ${temporadas['1'].part}}
\\chapter{${ep.title}}
\\input{S${padTwo(ep.temporada)}/S${padTwo(ep.temporada)}E${padTwo(ep.episodio)}}
`)

function readEpisode(temporada, episodio) {
  const filepath = path.join(cwd(), `temporadas/S${padTwo(temporada)}/S${padTwo(temporada)}E${padTwo(episodio)}.md`)
  var input = vfile.readSync(filepath)
  const proc = remark().use(frontmatter, [{ "type": "yaml", "fence": "---" }])
  const actual = JSON.parse(JSON.stringify(proc.parse(input)))
  return yaml.safeLoad(find(actual.children, (o) => (o.type === 'yaml')).value)
}

function generateTemporada(temporada, content) {
  const baseOutput = path.join(cwd(), `book/S${padTwo(temporada)}`)
  mkdirp.sync(baseOutput)
  const output = path.join(baseOutput, `S${padTwo(temporada)}.tex`)
  fs.writeFileSync(output, content)
}

function padTwo(value) {
  return padStart(value, 2, '0')
}
