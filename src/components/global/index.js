import Cena from './Cena.vue'
import Dialogo from './Dialogo.vue'
import Musica from './Musica.vue'
import Letra from './Letra.vue'
import CodEpisodio from './CodEpisodio.vue'
import Chandler from './Chandler.vue'
import Heckles from './Heckles.vue'
import ObsessionGirl from './ObsessionGirl.vue'
import Monica from './Monica.vue'
import Ross from './Ross.vue'
import Rachel from './Rachel.vue'
import Phoebe from './Phoebe.vue'
import Iris from './Iris.vue'
import Joey from './Joey.vue'
import Jack from './Jack.vue'
import Janice from './Janice.vue'
import David from './David.vue'
import Max from './Max.vue'
import CarolOne from './CarolOne.vue'
import Carol from './Carol.vue'
import Gloria from './Gloria.vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TwitterIcon,
  FacebookIcon,
  MailIcon,
  GithubIcon,
  MusicIcon
} from 'vue-feather-icons'

import LanguageIcon from './LanguageIcon.vue'

import FacebookButton from './social-media/FacebookButton.vue'
import TwitterButton from './social-media/TwitterButton.vue'

export default {
  install (Vue) {
    Vue.component('cena', Cena)
    Vue.component('dialogo', Dialogo)
    Vue.component('musica', Musica)
    Vue.component('letra', Letra)
    Vue.component('cod-episodio', CodEpisodio)

    Vue.component('carol', Carol)
    Vue.component('carol-one', CarolOne)
    Vue.component('chandler', Chandler)
    Vue.component('david', David)
    Vue.component('gloria', Gloria)
    Vue.component('heckles', Heckles)
    Vue.component('iris', Iris)
    Vue.component('jack', Jack)
    Vue.component('janice', Janice)
    Vue.component('joey', Joey)
    Vue.component('max', Max)
    Vue.component('monica', Monica)
    Vue.component('obsession-girl', ObsessionGirl)
    Vue.component('phoebe', Phoebe)
    Vue.component('rachel', Rachel)
    Vue.component('ross', Ross)

    // icons
    Vue.component('chevron-left-icon', ChevronLeftIcon)
    Vue.component('chevron-right-icon', ChevronRightIcon)
    Vue.component('twitter-icon', TwitterIcon)
    Vue.component('facebook-icon', FacebookIcon)
    Vue.component('mail-icon', MailIcon)
    Vue.component('github-icon', GithubIcon)
    Vue.component('music-icon', MusicIcon)
    Vue.component('language-icon', LanguageIcon)

    Vue.component('facebook-button', FacebookButton)
    Vue.component('twitter-button', TwitterButton)
  }
}
