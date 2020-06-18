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
                  :alt="$page.episodio.title"/>
            </div>
          </OnThisPage>
        </div>
        <div class="order-1 w-full md:w-2/3">
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
          <div
            v-if="$page.episodio.headings.length === 0"
            class="text-center bg-gray-200 p-4 rounded-lg mb-8">
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
    title
    temporada
    episodio
    date (format: "MMMM D, Y", locale: "pt-BR")
    timeToRead
    linkAnterior
    linkProximo
    path
    image
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
