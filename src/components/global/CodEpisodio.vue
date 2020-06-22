<template functional>
  <div class="inline-block py-1 px-3 rounded bg-orange-200 text-orange-600 text-md font-semibold tracking-wide mb-2">
    {{ props.codEpisodio }}
  </div>
</template>

<script>
export default {
  props: {
    codEpisodio: {
      type: String,
      required: true
    }
  }
}
</script>
