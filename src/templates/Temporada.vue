<template>
  <Layout>
    <div class="container mb-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-10">
        <h1 class="sm:text-3xl text-2xl font-bold title-font mb-4 text-blue-700">
          Temporada {{ $context.temporada }}
        </h1>
        <p class="lg:w-2/3 mx-auto text-lg">
          Confira o <em>Glossário</em> de cada temporada abaixo
        </p>
      </div>
      <div>
        <div
          v-for="item in $page.episodios.edges"
          :key="item.node.path"
          class="py-8 flex flex-wrap md:flex-no-wrap"
        >
          <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span class="tracking-widest font-medium title-font text-gray-900">
              S{{ pad(item.node.temporada) }}E{{ pad(item.node.episodio) }}
            </span>
            <span class="mt-1 text-gray-600 text-sm">{{ item.node.date }}</span>
          </div>
          <div class="md:flex-grow">
            <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
              {{ item.node.title }}
            </h2>
            <p class="leading-relaxed">
              {{ item.node.summary }}
            </p>
            <g-link
              :to="item.node.path"
              class="text-blue-500 inline-flex items-center mt-4"
            >
              Visualizar
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Episodios ($temporada: Int) {
  episodios: allEpisodio (
      filter: {
        temporada: {
          eq: $temporada
        }
      },
      sortBy: "episodio",
      order: ASC
    ) {
    edges {
      node {
        path
        title
        temporada
        episodio
        date (format: "MMMM D, Y", locale: "pt-BR")
        summary
      }
    }
  }
}
</page-query>

<script>
export default {
  methods: {
    pad (text, size) {
      var s = text.toString();
      while (s.length < (size || 2)) { s = '0' + s; }
      return s;
    }
  }
}
</script>

<style>
</style>
