<template functional>
  <dialogo
    :imagem="require('~/assets/img/janice.png')"
    personagem="Janice"
    cor-fundo="bg-red-200"
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
