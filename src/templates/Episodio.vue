<template>
  <Layout>
    <div class="bg-white rounded container mx-auto my-16">
      <div class="flex flex-wrap items-start justify-start">
        <div
          class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
          style="top: 4rem"
        >
          <OnThisPage />
        </div>
        <div class="order-1 w-full md:w-2/3 mt-8">
          <cod-episodio v-bind="$page.episodio">
          </cod-episodio>
          <div class="text-4xl font-bold leading-tight mb-2">
            {{ $page.episodio.title }}
          </div>
          <div class="text-xl text-gray-600 mb-4">
            {{ $page.episodio.date }}
            &middot;
            {{ $page.episodio.timeToRead }}
          </div>
          <div class="content markdown-body mb-8">
            <VueRemarkContent />
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
    title
    temporada
    episodio
    date (format: "MMMM D, Y", locale: "pt-BR")
    timeToRead
    linkAnterior
    linkProximo
    path
    headings {
      depth
      value
      anchor
    }
  }
}
</page-query>

<script>
import OnThisPage from '~/components/OnThisPage.vue';
export default {
  components: {
    OnThisPage
  }
}
</script>

<style src="../assets/css/github-markdown.css" />
