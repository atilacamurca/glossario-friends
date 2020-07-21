<template functional>
  <dialogo
    :imagem="require('~/assets/img/obsession-girl.png')"
    personagem="Girl"
    cor-fundo="bg-orange-200"
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
