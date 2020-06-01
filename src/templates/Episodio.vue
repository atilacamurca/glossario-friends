<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <div class="inline-block py-1 px-3 rounded bg-orange-200 text-orange-600 text-md font-medium tracking-widest mb-2">
        S{{ pad($page.episodio.temporada) }}E{{ pad($page.episodio.episodio) }}
      </div>
      <h1 class="text-4xl font-bold leading-tight mb-2">
        {{ $page.episodio.title }}
      </h1>
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
        <g-link
          to="/temporadas"
          class="font-bold uppercase">
          Ver todas
        </g-link>
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

<style src="../assets/css/github-markdown.css" />
