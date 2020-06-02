<template functional>
  <dialogo
    :imagem="require('~/assets/img/joey.png')"
    personagem="Joey"
    cor-fundo="bg-pink-300"
    :original="props.original"
    :traducao="props.traducao"
  ></dialogo>
</template>

<script>
export default {
  props: {
    original: {
      type: String,
      required: true
    },
    traducao: {
      type: String,
      required: true
    }
  }
}
</script>
