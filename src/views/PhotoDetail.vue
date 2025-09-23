<template>
  <div class="content-wrapper">
    <div class="container my-4">
      <div v-if="photo" class="row gy-4">
        <div class="col-12 col-md-6">
          <img :src="photo.url" :alt="photo.title" class="gallery-image img-fluid" />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <h1 class="mb-3">{{ photo.title }}</h1>
          <p class="text-muted mb-4">{{ photo.desc }}</p>

          <form>
            <div class="mb-3">
              <label for="format-select" class="form-label">Formato</label>
              <select id="format-select" class="form-select styled-select" v-model="selectedFormat">
                <option v-for="option in formatOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="paper-select" class="form-label">Carta</label>
              <select id="paper-select" class="form-select styled-select" v-model="selectedPaper">
                <option v-for="option in paperOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="customization-select" class="form-label">Personalizzazione</label>
              <select id="customization-select" class="form-select styled-select" v-model="selectedCustomization">
                <option v-for="option in customizationOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="price-display mb-3">
              Prezzo: <strong>€{{ computedPrice }}</strong>
            </div>

            <button type="button" class="btn btn-primary" @click="handleAddToCart">
              {{ addedToCart ? 'Aggiunto al carrello!' : 'Aggiungi al carrello' }}
            </button>
          </form>
        </div>
      </div>

      <div v-else>
        <p>Foto non trovata.</p>
        <button class="btn btn-secondary mt-3" @click="$router.back()">Torna indietro</button>
      </div>
    </div>

    <NewsletterBanner class="container-fluid px-0" />
    <Footer class="container-fluid px-0" />
  </div>
</template>

<script>
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { NewsletterBanner, Footer },
  data() {
    return {
      selectedFormat: '',
      selectedPaper: '',
      selectedCustomization: '',
      addedToCart: false,
    }
  },
  computed: {
    ...mapGetters(['getPhotoById']),
    photo() {
      return this.getPhotoById(Number(this.$route.params.id))
    },
    formatOptions() {
      return ['30x40', '40x60', '50x70']
    },
    paperOptions() {
      return ['Lucida', 'Opaca']
    },
    customizationOptions() {
      return ['Cornice rovere', 'Cornice bianca']
    },
    computedPrice() {
      const priceByFormat = { '30x40': 40, '40x60': 50, '50x70': 60 }
      return priceByFormat[this.selectedFormat] || 0
    }
  },
  mounted() {
    if (this.photo) {
      this.selectedFormat = this.photo.format || ''
      this.selectedPaper = this.photo.paper || ''
      this.selectedCustomization = this.photo.customization || ''
    }
  },
  methods: {
    ...mapActions({
      setPhotoOptions: 'setPhotoOptions',
      addItemToCart: 'addToCart'
    }),
    handleAddToCart() {
      this.setPhotoOptions({
        id: this.photo.id,
        options: {
          format: this.selectedFormat,
          paper: this.selectedPaper,
          customization: this.selectedCustomization,
        }
      })
      const item = {
        id: this.photo.id,
        title: this.photo.title,
        format: this.selectedFormat,
        paper: this.selectedPaper,
        customization: this.selectedCustomization,
        price: this.computedPrice,
      }
      this.addItemToCart(item)
      this.addedToCart = true
      setTimeout(() => {
        this.addedToCart = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  padding-top: 70px;
}
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #eee;
  border-radius: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 0;
  cursor: default;
  overflow: hidden;
}
h1 {
  font-weight: 700;
  margin-bottom: 1rem;
}
.d-flex.flex-column > p.text-muted {
  margin-left: 0;
  padding-left: 0;
}
p.text-muted {
  color: #6c757d;
}
.mb-4 {
  margin-bottom: 1.5rem !important;
}
.form-label {
  font-weight: 600;
  color: #413f3f;
}
.styled-select {
  border: 1px solid #b89c94;
  border-radius: 0.25rem;
  padding: 10px 15px;
  font-size: 1rem;
  color: #413f3f;
  background-color: #f9f0ed;
}
.price-display {
  font-size: 1.5rem;
  font-weight: 700;
  color: #413f3f;
}
.btn-primary {
  border-radius: 30px;
  padding: 0.7rem 2rem;
  font-weight: 700;
  font-size: 1.1rem;
  background-color: #e0b3a4;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #c79484;
}
.container {
  max-width: 960px;
}
</style>
