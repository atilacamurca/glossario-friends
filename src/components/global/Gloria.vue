<template functional>
  <dialogo
    :imagem="require('~/assets/img/gloria.png')"
    personagem="Gloria"
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
