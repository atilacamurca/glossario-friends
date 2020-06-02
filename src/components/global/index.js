import Cena from './Cena.vue'
import Dialogo from './Dialogo.vue'

export default {
    install(Vue) {
        Vue.component('cena', Cena)
        Vue.component('dialogo', Dialogo)
    }
}
