<template functional>
  <Layout>
    <div class="container mt-4 mb-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-3xl text-2xl font-bold title-font mb-4 text-blue-700">
          Temporadas
        </h1>
        <p class="lg:w-2/3 mx-auto text-lg">
          Confira o <em>Glossário</em> de cada temporada abaixo
        </p>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <div
          v-for="i in 10"
          :key="i"
          class="lg:w-1/4 sm:w-1/2 p-4"
        >
          <div>
            <g-link
              :to="`/temporada/${i}`"
              class="flex relative"
            >
              <g-image
                :alt="`Temporada ${i}`"
                class="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                :src="`/temporadas/thumbnail-${i}.jpg`"
              ></g-image>
              <div class="px-8 py-40 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-75 rounded-lg hover:border-blue-600">
                <h2 class="tracking-normal text-center text-3xl title-font font-bold text-blue-600 mb-1">
                  Temporada {{ i }}
                </h2>
              </div>
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
