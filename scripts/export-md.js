const recursive = require("recursive-readdir")
const fs = require('fs')
const mkdirp = require('mkdirp')
const padStart = require('lodash.padstart')
const download = require('image-downloader')

;(async function () {
  try {
    const files = await recursive("./tmp-eps")
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      await saveMarkdown(file)
    }
  } catch (e) {
    console.error(e)
  }
})()

async function saveMarkdown (file) {
  const data = require(`${process.cwd()}/${file}`)
  const aPath = file.split('/')
  const season = aPath[1]
  const episode = aPath[2].split('.')[0]

  console.log('exportando season', season, 'episode', episode)
  const basePath = `${process.cwd()}/temporadas-build/S${padStart(season, 2, '0')}`
  mkdirp.sync(`${basePath}/img/${episode}`)
  const content = `---
title: ${data.name}
temporada: ${season}
episodio: ${episode}
date: ${data.air_date}
summary: ${data.overview}
image: ./img/${episode}/thumb-medium.jpg
---
`
  fs.writeFileSync(`${basePath}/S${padStart(season, 2, '0')}E${padStart(episode, 2, '0')}.md`, content)

  /*const options = {
    url: `https://image.tmdb.org/t/p/w500${data.still_path}`,
    dest: `${basePath}/img/${episode}/thumb-medium.jpg`
  }

  const imgFilename = await download.image(options)
  console.log('salvando imagem', imgFilename.filename)*/
}
