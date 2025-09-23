import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap css + js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// il tuo stile personale
import './assets/styles/style.css'

// Aggiungo icona carrello alla libreria FontAwesome
library.add(faShoppingCart)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)
app.use(router)
app.mount('#app')
