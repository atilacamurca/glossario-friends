// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const siteName = 'Glossário Friends'
const siteUrl = 'https://glossario-friends.netlify.com'

module.exports = {
  siteName,
  siteDescription: 'Aquele com o Glossário de Friends: Entenda referências da série',
  siteUrl,
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          content: [
            './src/**/*.vue',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.html',
            './src/**/*.pug',
            './src/**/*.md',
            './temporadas/**/*.md'
          ],
          whitelist: [
            'body',
            'html',
            'img',
            'a',
            'g-image',
            'g-image--lazy',
            'g-image--loaded',
            'active',
          ],
          whitelistPatterns: [/^bg-/],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        },
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Episodio',
        baseDir: './temporadas',
        route: '/temporada/:temporada/episodio/:episodio',
        template: './src/templates/Episodio.vue',
        plugins: [
          'remark-slug',
          'remark-autolink-headings',
          'remark-external-links',
          'remark-squeeze-paragraphs',
          'remark-fix-guillemets',
          'remark-attr'
        ]
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Episodio',
        feedOptions: {
          title: siteName,
          feed_url: `${siteUrl}/rss.xml`,
          site_url: `${siteUrl}/`
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: `${siteUrl}${node.path}`,
          author: 'Átila Camurça',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: siteName,
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        disableServiceWorker: false,
        serviceWorkerPath: "service-worker.js",
        cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        shortName: siteName,
        themeColor: "#3182ce",
        backgroundColor: "#f7fafc",
        icon: "src/favicon-pwa.png",
        msTileImage: "",
        msTileColor: "#3182ce",
        gcmSenderId: undefined,
      },
    }
  ],
  transformers: {
    remark: {
      plugins: [
        [
          'gridsome-plugin-remark-shiki',
          {
            theme: 'Material-Theme-Palenight',
            skipInline: true
          }
        ]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
}
