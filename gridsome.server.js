// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const readingTime = require('reading-time')

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
