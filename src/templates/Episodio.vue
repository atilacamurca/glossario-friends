<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <cod-episodio v-bind="$page.episodio">
      </cod-episodio>
      <div class="text-4xl font-bold leading-tight mb-2">
        {{ $page.episodio.title }}
      </div>
      <div class="text-xl text-gray-600 mb-4">{{ $page.episodio.date }}</div>
      <div class="markdown-body mb-8">
        <VueRemarkContent />
      </div>
      <div class="mb-8 flex justify-between">
        <g-link
          :to="`/temporada/${$page.episodio.temporada}`"
          class="font-bold uppercase">
          Voltar para Temporada {{ $page.episodio.temporada }}
        </g-link>
        <div class="flex">
          <g-link
            :to="$page.episodio.anterior"
            class="font-bold uppercase flex">
            <chevron-left-icon></chevron-left-icon>
            Anterior
          </g-link>
          <g-link
            :to="$page.episodio.proximo"
            class="font-bold uppercase flex ml-4">
            Próximo
            <chevron-right-icon></chevron-right-icon>
          </g-link>
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
    date (format: "MMMM D, Y")
    proximo
    anterior
  }
}
</page-query>

<script>
export default {
}
</script>

<style src="../assets/css/github-markdown.css" />
