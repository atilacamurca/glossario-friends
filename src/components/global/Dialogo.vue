<template functional>
  <div class="markdown-dialogo flex sm:flex-row flex-col mt-4 mb-6">
    <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center flex-shrink-0">
      <g-image
        :src="props.imagem"
        :alt="props.personagem"
        width="72"
        class="rounded-full"
        :class="props.corFundo"
      />
    </div>
    <div class="flex flex-col flex-grow items-start">
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
      default: 'bg-teal-500'
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
