<template functional>
  <div class="markdown-dialogo flex sm:flex-row flex-col mt-4 mb-6">
    <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 flex-shrink-0 flex items-center md:flex-col">
      <g-image
        :src="props.imagem"
        :alt="props.personagem"
        width="72"
        class="rounded-full w-full"
        :class="props.corFundo"
      />
      <div class="md:text-sm font-semibold ml-3 md:ml-0">{{ props.personagem }}</div>
    </div>
    <div class="flex flex-col items-start">
      <div class="text-copy-primary text-xl title-font font-medium">{{ props.original }}</div>
      <div class="text-copy-secondary text-xl title-font">{{ props.traducao }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagem: {
      type: String,
      required: true
    },
    personagem: {
      type: String,
      default: 'desconhecido'
    },
    corFundo: {
      type: String,
      default: 'bg-teal-300'
    },
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
