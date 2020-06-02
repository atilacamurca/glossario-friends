<template functional>
  <dialogo
    :imagem="require('~/assets/img/monica.png')"
    personagem="Monica"
    cor-fundo="bg-purple-300"
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
