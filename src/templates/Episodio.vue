<template>
  <Layout>
    <div class="container mx-auto my-16">
      <div class="flex flex-wrap items-start justify-start">
        <div
          class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
          style="top: 4rem"
        >
          <OnThisPage>
            <div class="w-full md:w-48 lg:w-64 rounded shadow">
              <g-image
                :src="$page.episodio.image"
                width="500"
                class="rounded"
                :alt="$page.episodio.title"
              />
            </div>
          </OnThisPage>
        </div>
        <div class="order-1 w-full md:w-2/3">
          <div class="flex justify-between">
            <cod-episodio :cod-episodio="$page.episodio.codEpisodio">
            </cod-episodio>
            <div class="flex">
              <twitter-button
                class="mx-2"
                :page_url="pageUrl"
                :page_title="pageTitle"
              ></twitter-button>
              <facebook-button
                class="mx-2"
                :page_url="pageUrl"
                :page_title="pageTitle"
              ></facebook-button>
            </div>
          </div>
          <div class="text-4xl font-bold leading-tight mb-2">
            {{ $page.episodio.title }}
          </div>
          <div class="text-xl text-gray-600 mb-4">
            {{ $page.episodio.date }}
            &bullet;
            {{ $page.episodio.timeToRead }}
          </div>
          <div class="content markdown-body mb-8">
            <p>{{ $page.episodio.summary }}</p>
            <VueRemarkContent />
          </div>
          <no-refs v-if="$page.episodio.noRefs"></no-refs>
          <div
            v-else-if="$page.episodio.headings.length === 0"
            class="text-center bg-gray-200 p-4 rounded-lg mb-8"
          >
            <div class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Episódio ainda não está concluído
            </div>
            <p class="mb-4 text-lg leading-relaxed">
              Estamos fazendo o possível para trazer esse episódio para você.
            </p>
            <p class="mb-8 text-lg leading-relaxed">
              Fique de olho em nossas redes sociais para mais novidades!
            </p>
            <a
              href="https://twitter.com/GlossarioFriend"
              target="_blank"
              rel="noopener"
              class="bg-indigo-200 inline-flex py-3 px-5 rounded-lg items-center hover:bg-indigo-300 focus:outline-none"
              aria-label="Acesse o Twitter de @GlossarioFriend"
            >
              <twitter-icon></twitter-icon>
              <span class="ml-4 title-font font-medium">Twitter</span>
            </a>
            <a
              href="https://www.facebook.com/GlossarioFriend/"
              target="_blank"
              rel="noopener"
              class="ml-4 bg-indigo-200 inline-flex py-3 px-5 rounded-lg items-center hover:bg-indigo-300 focus:outline-none"
              aria-label="Acesse o Facebook de @GlossarioFriend"
            >
              <facebook-icon></facebook-icon>
              <span class="ml-4 title-font font-medium">Facebook</span>
            </a>
          </div>
          <div class="mb-8 flex justify-between">
            <g-link
              :to="`/temporada/${$page.episodio.temporada}`"
              class="font-bold uppercase"
            >
              Voltar para Temporada {{ $page.episodio.temporada }}
            </g-link>
            <div class="flex">
              <g-link
                :to="$page.episodio.linkAnterior"
                class="font-bold uppercase flex"
              >
                <chevron-left-icon></chevron-left-icon>
                Anterior
              </g-link>
              <g-link
                :to="$page.episodio.linkProximo"
                class="font-bold uppercase flex ml-4"
              >
                Próximo
                <chevron-right-icon></chevron-right-icon>
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Episodio ($path: String!) {
  episodio (path: $path) {
    codEpisodio
    title
    temporada
    episodio
    date (format: "MMMM D, Y", locale: "pt-BR")
    timeToRead
    summary
    linkAnterior
    linkProximo
    path
    image
    noRefs
    headings {
      depth
      value
      anchor
    }
  }
}
</page-query>

<static-query>
  query {
    metadata {
      siteUrl
      siteDescription
    }
  }
</static-query>

<script>
import OnThisPage from '~/components/OnThisPage.vue'
import NoRefs from '~/components/NoRefs.vue'
export default {
  components: {
    OnThisPage,
    NoRefs
  },
  computed: {
    pageTitle () {
      const { codEpisodio, title } = this.$page.episodio
      return `Conheça as referências de ${codEpisodio} '${title}' de #Friends`
    },
    pageUrl () {
      return `${this.$static.metadata.siteUrl}${this.$page.episodio.path}`
    },
    pageImage () {
      return `${this.$static.metadata.siteUrl}${this.$page.episodio.image.src}`
    }
  },
  metaInfo () {
    return {
      meta: [
        // Open Graph / Facebook
        {
          name: 'og:title',
          content: `${this.$static.metadata.siteDescription}`
        },
        {
          name: 'og:description',
          content: this.pageTitle
        },
        {
          name: 'og:image',
          content: this.pageImage
        },
        // Twitter
        {
          name: 'twitter:image',
          content: this.pageImage
        },
        {
          name: 'twitter:title',
          content: `${this.$static.metadata.siteDescription}`
        },
        {
          name: 'twitter:description',
          content: this.pageTitle
        }
      ]
    }
  }
}
</script>

<style src="../assets/css/github-markdown.css" />
