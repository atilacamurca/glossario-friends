<template>
  <div class="inline-block py-1 px-3 rounded bg-orange-200 text-orange-600 text-md font-semibold tracking-wide mb-2">
    S{{ pad(temporada) }}E{{ pad(episodio) }}
  </div>
</template>

<script>
export default {
  props: {
    temporada: {
      type: Number,
      required: true
    },
    episodio: {
      type: Number,
      required: true
    }
  },
  methods: {
    pad (text, size) {
      var s = text.toString();
      while (s.length < (size || 2)) { s = '0' + s; }
      return s;
    }
  }
}
</script>
