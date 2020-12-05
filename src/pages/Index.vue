<template>
  <Layout>
    <div class="bg-indigo-100">
      <div class="hero container mx-auto flex flex-col sm:flex-row justify-between py-16">
        <div class="lg:flex lg:flex-col lg:justify-center w-full sm:w-3/5 text-center sm:text-left">
          <!-- <div class="text-4xl leading-tight">{{ $static.metadata.siteName }}</div> -->
          <div class="font-bold text-4xl text-grey-900 tracking-tight">
            O Dicionário Webster define <em class="text-blue-600">Glossário</em> como:
          </div>
          <blockquote class="border-l-4 p-3 text-3xl">
            Uma coleção de explicações textuais ou
            de termos especializados com seus significados.
          </blockquote>
          <div class="flex mt-4">
            <a
              href="https://www.merriam-webster.com/dictionary/glossary"
              class="flex p-2"
            >
              <external-link-icon class="h-5 w-5 mr-1"></external-link-icon>
              <span class="text-grey-700">Webster</span>
            </a>
          </div>
        </div>
        <div class="mt-8 sm:mt-0">
          <g-image
            src="~/assets/img/Friends_building.jpg"
            alt="hero"
            width="360"
            class="mx-auto sm:mx-0 rounded-lg"
          />
        </div>
      </div>
    </div>

    <div class="container-inner mx-auto mt-4">
      <p class="text-4xl font-bold mb-4">
        Bem-vindo ao <em>Glossário Friends</em>.
      </p>
      <p class="text-lg sm:text-xl mb-4">
        Se &#8212; enquanto assistia <em>Friends</em>
        repetidas vezes &#8212; você não entendeu uma referência, viu ou ouviu
        algo que não compreendeu, esse é o site para você.
      </p>

      <p class="text-lg sm:text-xl mb-4">
        Aqui tentaremos explicar essas referências e contextualizar algumas piadas
        de cada episódio, mostrando: o personagem, a fala original, a fala traduzida
        e um pouco de história. Veja alguns exemplos:
      </p>
    </div>

    <div class="container-inner px-5 py-8 mx-auto">
      <VueSlickCarousel v-bind="carousel">
        <template v-for="item in $page.allHighlights.edges">
          <div
            v-for="h in item.node.highlights"
            :key="h.url"
          >
            <div class="rounded-lg overflow-hidden">
              <g-image
                :src="h.image.src"
                :alt="h.image.alt"
              ></g-image>
            </div>
            <a :href="h.url">
              <div class="rounded shadow-lg p-4 -mt-16 mb-6 mx-6 z-10 relative bg-white">
                <h1 class="text-gray-900 text-xl sm:text-3xl title-font font-semibold mb-1 hover:text-blue-700">{{ h.title }}</h1>
                <h2 class="text-xs sm:text-sm title-font text-gray-600 tracking-widest uppercase">
                  <cod-episodio :cod-episodio="h.episode">
                  </cod-episodio>
                  {{ h.episodeName }}
                </h2>
                <p class="text-gray-700">{{ h.context }}</p>
              </div>
            </a>
          </div>
        </template>
      </VueSlickCarousel>
    </div>

    <div class="container-inner px-5 py-8 mx-auto">
      <g-link
        to="/temporadas"
        class="inline-flex justify-center items-center text-center text-2xl text-white hover:text-white bg-blue-700 border-0 py-6 w-full focus:outline-none hover:bg-blue-800 rounded mx-auto my-4"
      >
        <span class="flex items-start flex-col leading-none">
          Ver temporadas
        </span>
        <arrow-right-icon></arrow-right-icon>
      </g-link>
    </div>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<page-query>
query {
  allHighlights: allHighlightsTemplate(sortBy: "episode", order: ASC) {
    edges {
      node {
        id
        highlights {
          image {
            src
            alt
          }
          url
          title
          episode
          episodeName
          context
        }
      }
    }
  }
}
</page-query>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import BackgroundDots from '~/components/BackgroundDots'
import ExternalLinkIcon from '~/components/ExternalLinkIcon'
import { ArrowRightIcon } from 'vue-feather-icons'

export default {
  metaInfo: {
    title: 'Início'
  },
  components: {
    BackgroundDots,
    ExternalLinkIcon,
    VueSlickCarousel,
    ArrowRightIcon
  },
  data () {
    return {
      carousel: {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true
      }
    }
  }
}
</script>

<style src="vue-slick-carousel/dist/vue-slick-carousel.css"></style>
<style src="vue-slick-carousel/dist/vue-slick-carousel-theme.css"></style>
