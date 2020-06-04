import Cena from './Cena.vue'
import Dialogo from './Dialogo.vue'
import CodEpisodio from './CodEpisodio.vue'
import Chandler from './Chandler.vue'
import Monica from './Monica.vue'
import Ross from './Ross.vue'
import Rachel from './Rachel.vue'
import Phoebe from './Phoebe.vue'
import Joey from './Joey.vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons'

export default {
  install (Vue) {
    Vue.component('cena', Cena)
    Vue.component('dialogo', Dialogo)
    Vue.component('cod-episodio', CodEpisodio)
    Vue.component('chandler', Chandler)
    Vue.component('monica', Monica)
    Vue.component('ross', Ross)
    Vue.component('rachel', Rachel)
    Vue.component('phoebe', Phoebe)
    Vue.component('joey', Joey)

    // icons
    Vue.component('chevron-left-icon', ChevronLeftIcon)
    Vue.component('chevron-right-icon', ChevronRightIcon)
  }
}
