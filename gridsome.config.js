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
            './docs/**/*.md',
            './blog/**/*.md',
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
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
          [
            'gridsome-plugin-remark-shiki',
            {
              theme: 'Material-Theme-Palenight',
              skipInline: true
            }
          ]
      ],
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
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
          'remark-fix-guillemets'
        ]
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
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
  ],
  templates: {
    Tag: '/tag/:id'
  },
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
