<template>
  <Layout>
    <div class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16">
      <div class="font-bold w-full sm:w-3/5 text-center sm:text-left">
        <div class="text-4xl leading-tight">{{ $static.metadata.siteName }}</div>
        <div class="text-2xl text-blue-600 leading-tight">
          O Dicionário Webster define <em>Glossário</em> como:
        </div>
        <blockquote class="border-l-4 p-3 text-2xl">
          Uma coleção de explicações textuais ou
          de termos especializados com seus significados.
        </blockquote>
        <a
          href="https://www.merriam-webster.com/dictionary/glossary"
          class="flex p-2"
        >
          <external-link-icon class="h-5 w-5 mr-1"></external-link-icon> Webster
        </a>
      </div>
      <div class="mt-8 sm:mt-0">
        <g-image
          src="~/assets/img/Friends_building.jpg"
          alt="hero"
          width="320"
          class="mx-auto sm:mx-0 rounded-lg"
        />
      </div>
    </div>

    <div class="container-inner mx-auto">
      <p class="text-3xl font-bold mb-4">
        Bem-vindo ao <em>Glossário Friends</em>.
      </p>
      <p class="text-lg sm:text-xl mb-4">
        Se - enquanto assistia <em>Friends</em>
        repetidas vezes - você não entendeu uma referência, viu ou ouviu algo que não entendeu,
        esse é o site para você.
      </p>

      <p class="text-lg sm:text-xl mb-4">
        Aqui tentaremos explicar essas referências e contextualizar algumas piadas de cada
        episódio, mostrando: a personagem, a fala original, a fala traduzida e um pouco de história.
        Por exemplo no episódio:
      </p>
      <p class="text-2xl font-bold">S01E01 - The One Where Monica Gets a New Roommate</p>
    </div>

    <div class="container-inner px-5 py-8 mx-auto">
      <cena>
        <monica
          original="- Wait, unless you happened to catch the Reruns' production of Pinocchio."
          traducao="- Espera, a não ser que tenha visto a refilmagem do Pinóquio."
        ></monica>
        <chandler
          original="- Look, Gepetto, I'm a real live boy."
          traducao="- Olha, Gepetto, sou um menino de verdade."
        ></chandler>
      </cena>
      <p class="text-lg sm:text-xl mb-4">
        Referência ao filme <a href="https://www.imdb.com/title/tt0032910/">Pinóquio</a> (1940),
        produzido pela Walt Disney, onde é contada a história de um velho carpinteiro chamado Gepetto,
        que faz um boneco de madeira chamado Pinóquio, o qual é trazido a vida pela Fada Azul,
        com a condição de que ele demonstre obediência, bravura e lealdade a seu criador.
      </p>
      <p class="text-lg sm:text-xl mb-4">
        O filme tem muitos trechos musicais, e é daí que o Chandler retira inspiração para a música
        que ele canta ao sair do apartamento:
      </p>
      <blockquote class="border-l-4 border-blue-600 p-3 text-xl italic mb-4">
        Once I was a wooden boy, a little wooden boy...
      </blockquote>
      <div class="text-lg sm:text-xl mb-4">
        Referências:
      </div>
      <ul class="list-decimal">
        <li>
          <a
            href="https://www.imdb.com/title/tt0032910/"
            target="_blank"
            rel="noopener noreferrer"
          >IMBD</a>
        </li>
        <li>
          <a
            href="https://pt.wikipedia.org/wiki/Pin%C3%B3quio_(filme)"
            target="_blank"
            rel="noopener noreferrer"
          >Wikipédia</a>
        </li>
      </ul>
      <g-link to="/temporadas" class="flex items-center text-lg text-white hover:text-white bg-blue-600 border-0 py-3 px-4 w-full focus:outline-none hover:bg-blue-700 rounded mx-auto my-4">
        Ver mais
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
      </g-link>
    </div>


    <!-- <div class="overflow-x-hidden">
      <div class="projects container-inner mx-auto text-xl border-t border-gray-500 border-b py-16 mb-16 relative">
        <h2
          class="font-bold mb-6"
          id="projects"
        >Here are some projects I've worked on:</h2>

        <div
          class="absolute right-0"
          style="top: 50px; transform: translate(100%) rotate(180deg)"
        >
          <svg
            width="170px"
            height="170px"
          >
            <use xlink:href="#dots-triangle" /></svg>
        </div>

        <ul class="text-lg sm:text-xl space-y-6">
          <li class="checkmark">
            <div>Project One</div>
            <div class="text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ab nam animi iure nemo exercitationem a, eius non culpa itaque!</div>
          </li>
          <li class="checkmark">
            <div>Project Two</div>
            <div class="text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ab nam animi iure nemo exercitationem a, eius non culpa itaque!</div>
          </li>
          <li class="checkmark">
            <div>Project Three</div>
            <div class="text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ab nam animi iure nemo exercitationem a, eius non culpa itaque!</div>
          </li>
          <li class="checkmark">
            <div>Project Four</div>
            <div class="text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ab nam animi iure nemo exercitationem a, eius non culpa itaque!</div>
          </li>

        </ul>
      </div>
    </div> -->

    <!-- <div class="overflow-x-hidden border-gray-200 border-b">
      <div class="get-to-know-me container-inner mx-auto text-xl pb-16 relative">
        <h2 class="font-bold mb-6" id="about">Get to know me:</h2>

        <div class="absolute left-0" style="top: 50px; transform: translateX(-100%)">
          <svg width="170px" height="170px"><use xlink:href="#dots-triangle" /></svg>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center mb-16">
          <div><g-image src="../../static/avatar.jpg" alt="avatar" class="w-32 h-32 rounded-full mb-8 lg:mb-0" /></div>
          <div class="flex-1 text-lg sm:text-xl ml-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quae architecto minus molestias iusto ducimus fuga quo quia libero dignissimos, fugiat modi assumenda debitis laboriosam.</div>
        </div>

        <div class="responsive-container">
          <iframe class="responsive-iframe w-full h-full top-0 left-0 border-0" src="https://www.youtube.com/embed/uHo6o1TNQeE" style="border:0;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div> -->

    <!-- <div class="newsletter bg-background-tertiary">
      <div class="container-inner mx-auto py-16 pb-8 text-center textl-xl">
        <h2 class="text-2xl font-bold mb-8">Join my Newsletter</h2>

        <div class="w-4/5 mx-auto mb-8">
          <p class="mb-8 text-lg sm:text-xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, voluptatum. Quam, deleniti nulla.</p>

          <form action="#">
            <div class="flex flex-col sm:flex-row">
              <input type="email" name="email" placeholder="Your email address" class="flex-1 bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-green-700 z-10" required>
              <button data-element="submit" class="flex-2 w-40 uppercase bg-green-700 text-white rounded sm:rounded-l-none text-lg py-3 px-8 tracking-wide shadow focus:outline-none hover:bg-green-800 focus:bg-green-800 z-10 w-full sm:w-auto mt-4 sm:mt-0">
                <span>Subscribe</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="container-inner mx-auto -mt-32 pb-4 overflow-x-hidden">
        <background-dots></background-dots>
      </div>
    </div> -->

  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import BackgroundDots from '~/components/BackgroundDots'
import ExternalLinkIcon from '~/components/ExternalLinkIcon'

export default {
  metaInfo: {
    title: 'Início'
  },
  components: {
    BackgroundDots,
    ExternalLinkIcon
  }
}
</script>

