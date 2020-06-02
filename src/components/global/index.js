import Cena from './Cena.vue'
import Dialogo from './Dialogo.vue'
import CodEpisodio from './CodEpisodio.vue'

export default {
    install(Vue) {
        Vue.component('cena', Cena)
        Vue.component('dialogo', Dialogo)
        Vue.component('cod-episodio', CodEpisodio)
    }
}
