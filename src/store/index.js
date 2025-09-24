import { createStore } from 'vuex'

const priceByFormat = {
  '30x40': 40,
  '40x60': 50,
  '50x70': 60
}

export default createStore({
  state: {
    photos: [],           // ora vuoto, dati caricati da file esterno
    photoOptions: {},     // opzioni dinamiche per id foto => { format, paper, customization }
    cart: []              // array con elementi carrello: { id, title, format, paper, customization, price, qty }
  },
  getters: {
    filteredPhotos: (state) => (q) => {
      if (!q) {
        return state.photos.map(photo => ({
          ...photo,
          url: photo.fileName ? `/images/${photo.fileName}` : ''
        }))
      }
      const query = q.toLowerCase()
      return state.photos
        .filter(photo =>
          photo.title.toLowerCase().includes(query) ||
          photo.desc.toLowerCase().includes(query) ||
          photo.tags.some(tag => tag.toLowerCase().includes(query))
        )
        .map(photo => ({
          ...photo,
          url: photo.fileName ? `/images/${photo.fileName}` : ''
        }))
    },
    getPhotoById: (state) => (id) => {
      const base = state.photos.find(p => p.id === id) || {}
      const options = state.photoOptions[id] || {}
      const price = priceByFormat[options.format] || 0
      return { ...base, ...options, price, url: base.fileName ? `/images/${base.fileName}` : '' }
    },
    cartItems: (state) => state.cart,
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0)
    }
  },
  mutations: {
    setPhotos(state, photos) {
      state.photos = photos
    },
    updatePhotoOptions(state, { id, options }) {
      state.photoOptions[id] = { ...state.photoOptions[id], ...options }
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(cartItem =>
        cartItem.id === item.id &&
        cartItem.format === item.format &&
        cartItem.paper === item.paper &&
        cartItem.customization === item.customization
      )
      if (existingItem) {
        existingItem.qty = (existingItem.qty || 1) + 1
      } else {
        state.cart.push({ ...item, qty: 1 })
      }
    }
  },
  actions: {
    async fetchPhotos({ commit }) {
      try {
        const response = await fetch('/data/photos.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const photos = await response.json()
        commit('setPhotos', photos)
      } catch (error) {
        console.error('Errore caricamento foto:', error)
      }
    },
    setPhotoOptions({ commit }, payload) {
      commit('updatePhotoOptions', payload)
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    }
  }
})
