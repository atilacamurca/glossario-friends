<template functional>
  <dialogo
    :imagem="require('~/assets/img/carol.png')"
    personagem="Carol"
    cor-fundo="bg-blue-200"
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
