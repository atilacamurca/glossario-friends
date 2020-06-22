// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const readingTime = require('reading-time')

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

function pad(text, size) {
  var s = text.toString();
  while (s.length < (size || 2)) { s = '0' + s; }
  return s;
}

module.exports = function (api, options) {
  api.loadSource(({ addSchemaResolvers }) => {
    addSchemaResolvers({
      Episodio: {
        timeToRead: {
          type: 'String',
          resolve (obj) {
            const { minutes } = readingTime(obj.content)
            return `${Math.ceil(minutes.toFixed(2))} min. de leitura`
          }
        },
        linkAnterior: {
          type: 'String',
          resolve (obj) {
            const { temporada, episodio } = obj
            if (episodio === 1) {
              return `/temporada/${temporada}/`
            }
            return `/temporada/${temporada}/episodio/${episodio - 1}/`
          }
        },
        linkProximo: {
          type: 'String',
          resolve (obj) {
            const { temporada, episodio } = obj
            if (temporada === 10) {
              return '/agradecimento' // TODO: criar página de agradecimento
            } else if (temporadas[temporada] === episodio) {
              // último episódio da temporada
              return `/temporada/${temporada + 1}`
            }
            return `/temporada/${temporada}/episodio/${episodio + 1}`
          }
        },
        codEpisodio: {
          type: 'String',
          resolve (obj) {
            const { temporada, episodio } = obj
            return `S${pad(temporada)}E${pad(episodio)}`
          }
        }
      }
    })
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allEpisodio {
        edges {
          node {
            path
            title
            temporada
            episodio
            date
            summary
          }
        }
      }
    }`)

    data.allEpisodio.edges.forEach(({ node }) => {
      createPage({
        path: `/temporada/${node.temporada}`,
        component: './src/templates/Temporada.vue',
        context: {
          temporada: node.temporada
        }
      })
    })
  })
}
