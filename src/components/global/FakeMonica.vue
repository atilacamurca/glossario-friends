<template functional>
  <dialogo
    :imagem="require('~/assets/img/fake-monica.png')"
    personagem="M. Falsa"
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
