<template>
  <div
    class="content-wrapper bg-background-primary font-sans text-primary leading-normal flex flex-col min-h-screen"
    :class="theme"
  >
    <header class="sticky top-0 z-20 bg-background-primary border-b border-b-ui-border shadow">
      <div class="border-t-8 border-blue-600">
        <nav class="container mx-auto flex flex-wrap justify-between items-center py-3">
          <div>
            <g-link
              v-if="theme === 'theme-light'"
              to="/"
            >
              <g-image
                src="~/assets/img/logo.svg"
                class="w-40"
                alt="logo"
                width="160"
              />
            </g-link>
            <g-link
              v-else
              to="/"
            >
              <g-image
                src="~/assets/img/logo_dark.svg"
                class="w-40"
                alt="logo"
                width="160"
              />
            </g-link>
          </div>
          <div class="block lg:hidden">
            <button
              @click="toggle"
              class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
            >
              <svg
                class="current-color h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  fill="gray"
                /></svg>
            </button>
          </div>
          <ul
            class="uppercase tracking-wide font-bold w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
            :class="isOpen ? 'block': 'hidden'"
          >
            <li class="mb-6 lg:mb-0">
              <search-input />
            </li>
            <li>
              <theme-switcher
                :theme="theme"
                @themeChanged="updateTheme"
              />
            </li>
            <li>
              <g-link
                to="/temporadas"
                class="text-copy-primary hover:text-gray-600"
              >Temporadas</g-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>
    <footer class="bg-blue-700 text-white">
      <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8">
        <div class="mb-8 lg:mb-0">
          <div>Copyright {{ new Date().getFullYear() }}. All rights reserved.</div>
          <div>
            <a
              href="/rss.xml"
              class="text-white hover:text-gray-400 font-normal"
            >RSS Feed</a> |
            <a
              href="/sitemap.xml"
              class="text-white hover:text-gray-400 font-normal"
            >Sitemap</a>
          </div>
        </div>
        <ul class="flex items-center space-x-8">

          <li>
            <a
              href="https://github.com/atilacamurca/glossario-friends"
              target="_blank"
              rel="noopener"
              class="text-white hover:text-gray-400"
              aria-label="Acesse o repositório do Github"
            >
              <github-icon></github-icon>
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/GlossarioFriend"
              target="_blank"
              rel="noopener"
              class="text-white hover:text-gray-400"
              aria-label="Acesse o Twitter de @GlossarioFriend"
            >
              <twitter-icon></twitter-icon>
            </a>
          </li>

          <li>
            <a
              href="https://www.facebook.com/GlossarioFriend/"
              target="_blank"
              rel="noopener"
              class="text-white hover:text-gray-400"
              aria-label="Acesse o Facebook de @GlossarioFriend"
            >
              <facebook-icon></facebook-icon>
            </a>
          </li>

          <li>
            <a
              href="mailto:glossariofriends@gmail.com"
              target="_blank"
              rel="noopener"
              class="text-white hover:text-gray-400"
              aria-label="Entre em contato por e-mail"
            >
              <mail-icon></mail-icon>
            </a>
          </li>
        </ul>
      </div>
    </footer>

    <div style="display:none">
      <svg
        id="dots-triangle"
        width="170"
        height="170"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M168.152 170a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 0a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.479 0a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zM94.24 133.043a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 36.956a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm-18.478 55.434a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.479 73.913a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm-18.478 92.391a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0 18.479a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zM1.848 133.044a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.695zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0 18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-55.435a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.479a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.695 1.848 1.848 0 0 1 0 3.695zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696zm0-18.478a1.848 1.848 0 1 1 0-3.696 1.848 1.848 0 0 1 0 3.696z"
          fill="#2C8056"
          fill-rule="evenodd"
          opacity=".503"
        /></svg>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SearchInput from '../components/SearchInput'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default {
  components: {
    SearchInput,
    ThemeSwitcher
  },
  mounted () {
    this.theme = localStorage.getItem('theme') || 'theme-light'
  },
  data () {
    return {
      isOpen: false,
      theme: '',
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    updateTheme (theme) {
      this.theme = theme
    }
  }
}
</script>

<style src="../assets/css/main.css" />
