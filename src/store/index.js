import { createStore } from 'vuex'

const photosStatic = [
  { id: 1, title: 'Firenze', desc: 'Vista su Cattedrale di Santa Maria del Fiore', tags: ['viaggio'], url: '/images/1.JPG' },
  { id: 2, title: 'Muralla Roja', desc: 'Nel labirinto di Ricardo Bofill', tags: ['design'], url: '/images/2.JPG' },
  { id: 3, title: 'Tramonto', desc: 'Quando il sole scompare nel mare', tags: ['viaggio'], url: '/images/3.JPG' },
  { id: 4, title: 'Scala conchiglia', desc: 'Urbex in Villa Carpeneto', tags: ['architettura'], url: '/images/4.JPG' },
  { id: 5, title: 'Rifugio Mollino', desc: 'Omaggio a Mollino a Gressoney-Saint-Jean', tags: ['architettura'], url: '/images/5.JPG' },
  { id: 6, title: 'Casa Talucchi', desc: 'Art Nouveau torinese', tags: ['architettura'], url: '/images/6.JPG' },
  { id: 7, title: 'Bath', desc: 'Vista sul ponte Pulteney', tags: ['viaggio'], url: '/images/7.JPG' },
  { id: 8, title: 'Lago di Braies', desc: 'La Perla delle Dolomiti', tags: ['viaggio'], url: '/images/8.JPG' },
  { id: 9, title: 'Alicante', desc: 'Vista dal Castillo de Santa Barbara', tags: ['viaggio'], url: '/images/9.JPG' },
  { id: 10, title: 'FLatvijas Nacionālā bilbiotēka', desc: 'Il castello di luce di Riga', tags: ['design'], url: '/images/10.JPG' },
  { id: 11, title: 'New York', desc: 'Passeggiando per il village', tags: ['viaggio'], url: '/images/11.JPG' },
  { id: 12, title: 'Vilandes iela 11', desc: 'Art Nouveau a Riga', tags: ['architettura'], url: '/images/12.JPG' },
  { id: 13, title: 'Faro di Capo Caccia', desc: 'Tramonto sardo', tags: ['viaggio'], url: '/images/13.JPG' },
  { id: 14, title: 'Castel Savoia', desc: 'La residenza estiva della Regina Margherita', tags: ['architettura'], url: '/images/14.JPG' },
  { id: 15, title: 'Centro Botín', desc: 'Renzo Piano a Santander', tags: ['design'], url: '/images/15.JPG' },
  { id: 16, title: 'Alassio', desc: 'Tramonto nella riviera ligure', tags: ['viaggio'], url: '/images/16.JPG' },
  { id: 17, title: 'Mole Antonelliana', desc: 'All\'improvviso la Mole', tags: ['architettura'], url: '/images/17.JPG' },
  { id: 18, title: 'Tallin', desc: 'Scorcio di centro storico', tags: ['viaggio'], url: '/images/18.JPG' },
  { id: 19, title: 'Florilegium', desc: 'Arte moderna nell\'Oratorio di San Tiburzio', tags: ['architettura'], url: '/images/19.JPG' },
  { id: 20, title: 'Myanmar', desc: 'Pescatori del Lago Inle', tags: ['viaggio'], url: '/images/20.JPG' },
  { id: 21, title: 'Scorcio Old University Library', desc: 'Dettaglio della libreria antica di Copenaghen', tags: ['architettura'], url: '/images/21.JPG' },
  { id: 22, title: 'Piazza del campo', desc: 'Vista dal Museo dell\'Opera del Duomo', tags: ['viaggio'], url: '/images/22.JPG' },
  { id: 23, title: 'Sala Mollino', desc: 'Interno del Turin Palace', tags: ['design'], url: '/images/23.JPG' },
  { id: 24, title: 'Matera', desc: 'Scorcio nel Sasso Barisano', tags: ['viaggio'], url: '/images/24.JPG' },
  { id: 25, title: 'crkva sv. Marka', desc: 'Città Alta a Zagabria', tags: ['architettura'], url: '/images/25.JPG' },
  { id: 26, title: 'Grundtvigs Kirke', desc: 'Esempio di stile nordico dell\'Espressionismo del mattone', tags: ['architettura'], url: '/images/26.JPG' },
  { id: 27, title: 'Brooklyn bridge', desc: 'Tramonto a New York', tags: ['viaggio'], url: '/images/27.JPG' },
  { id: 28, title: 'Superkilen', desc: 'Parco urbano a Copenagehn', tags: ['architettura'], url: '/images/28.JPG' },
  { id: 29, title: 'Diamante Nero', desc: 'Biblioteca Reale di Copenaghen', tags: ['architettura'], url: '/images/29.JPG' },
  { id: 30, title: 'Shah-i-Zinda', desc: 'Necropoli a Samarcanda', tags: ['viaggio'], url: '/images/30.JPG' },
  { id: 31, title: 'Gypshoteca di Canova', desc: 'Complesso museale di Possagno', tags: ['viaggio'], url: '/images/31.JPG' },
  { id: 32, title: 'Old University Library', desc: 'Biblioteca antica di Copenaghen', tags: ['design'], url: '/images/32.JPG' },
  { id: 33, title: 'Camparía', desc: 'Ex tonnara di Favignana', tags: ['design'], url: '/images/33.JPG' }
]

const priceByFormat = {
  '30x40': 40,
  '40x60': 50,
  '50x70': 60
}

export default createStore({
  state: {
    photosStatic,
    photoOptions: {},  // opzioni dinamiche per id foto => { format, paper, customization }
    cart: []           // array con elementi carrello: { id, title, format, paper, customization, price }
  },
  getters: {
    filteredPhotos: (state) => (q) => {
      if (!q) return state.photosStatic
      const query = q.toLowerCase()
      return state.photosStatic.filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.desc.toLowerCase().includes(query) ||
        photo.tags.some(tag => tag.toLowerCase().includes(query))
      )
    },
    getPhotoById: (state) => (id) => {
      const base = state.photosStatic.find(p => p.id === id) || {}
      const options = state.photoOptions[id] || {}
      const price = priceByFormat[options.format] || 0
      return { ...base, ...options, price }
    },
    cartItems: (state) => state.cart
  },
  mutations: {
    updatePhotoOptions(state, { id, options }) {
      state.photoOptions[id] = { ...state.photoOptions[id], ...options }
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item)
    }
  },
  actions: {
    setPhotoOptions({ commit }, payload) {
      commit('updatePhotoOptions', payload)
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    }
  }
})