<template>
  <Layout>
    <div class="container-inner mt-4 mb-24 mx-auto">
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
          <div class="md:w-64 md:mb-0 mb-6 md:mr-5 flex-shrink-0 flex flex-col w-full">
            <div class="flex justify-between">
              <cod-episodio v-bind="item.node">
              </cod-episodio>
              <div class="mt-1 text-gray-600 text-sm">{{ item.node.date }}</div>
            </div>
            <div class="rounded shadow lg:hover:shadow-lg">
              <g-link
              :to="item.node.path">
                <g-image
                  :src="item.node.image"
                  width="500"
                  class="w-full rounded object-cover object-center"
                  :alt="item.node.title"/>
              </g-link>
            </div>
          </div>
          <div class="md:flex-grow">
            <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
              {{ item.node.title }}
            </h2>
            <p class="text-lg leading-relaxed mb-4">
              {{ item.node.summary }}
            </p>
            <g-link
              :to="item.node.path"
              class="inline-flex text-white hover:text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-lg"
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
        image
      }
    }
  }
}
</page-query>

<script>
export default {
}
</script>
