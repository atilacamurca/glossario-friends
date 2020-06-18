require('dotenv').config()

const fs = require('fs')
const mkdirp = require('mkdirp')
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_API_KEY)

const temporadas = {
  '1': 24,
  '2': 24,
  '3': 25,
  '4': 24,
  '5': 24,
  '6': 25,
  '7': 24,
  '8': 24,
  '9': 24,
  '10': 18,
}

;(async function () {
  try {
    for (let key in temporadas) {
      console.log('exportando temporada', key)
      const size = temporadas[key];
      for (let i = 1; i <= size; i++) {
        const res = await moviedb.episodeInfo({ id: 1668, season_number: key, episode_number: i, language: 'pt-BR' })
        saveEpisode(key, i, res)
      }
    }
  } catch (e) {
    console.error(e)
  }
})()

function saveEpisode(season, episode, data) {
  mkdirp.sync(`./tmp-eps/${season}`)
  fs.writeFileSync(`./tmp-eps/${season}/${episode}.json`, JSON.stringify(data, null, 2));
}
