// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
import GlobalCompoments from '~/components/global'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(GlobalCompoments)

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  })

  Vue.use(VueFuse)

  head.meta.push({
    name: 'keywords',
    content: 'Friends,Glossário,Rachel Greene,Monica Geller,Phoebe Buffay,Ross Geller,Chandler Bing,Joey Tribbiani'
  })

  head.meta.push({
    name: 'author',
    content: 'Átila Camurça'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  })

  head.htmlAttrs = { lang: 'pt-br' }
}
