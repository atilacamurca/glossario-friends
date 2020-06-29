<template functional>
  <div class="flex flex-col md:flex-row items-stretch bg-background-tertiary p-2 rounded shadow mb-4">
    <div class="flex flex-col md:w-1/2 md:text-right mr-1 md:border-r md:border-b-0 border-b border-color-primary pr-2">
      <div><music-icon/></div>
      <div class="text-copy-primary whitespace-pre-line mb-2 -mt-4">
        <slot name="original"></slot>
      </div>
    </div>
    <div class="flex flex-col md:w-1/2 ml-1 mt-2 md:mt-0">
      <div class="flex md:justify-end">
        <language-icon/>
      </div>
      <div class="text-copy-secondary whitespace-pre-line mb-2 -mt-4">
        <slot name="traducao"></slot>
      </div>
    </div>
  </div>
</template>
