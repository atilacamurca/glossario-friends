<template functional>
    <dialogo
      :imagem="require('~/assets/img/dr-green.png')"
      personagem="Dr. Green"
      cor-fundo="bg-indigo-200"
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
