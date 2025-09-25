<template>
  <div class="content-wrapper">
    <div class="container my-4">
      <div v-if="photo" class="row gy-4">
        <div class="col-12 col-md-6">
          <img :src="photo.url" :alt="photo.title" class="gallery-image img-fluid" />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <button class="btn-portfolio-back" @click="$router.push({ name: 'PortfolioView' })">
            ← Torna al portfolio
          </button>
          <h1 class="mb-3">{{ photo.title }}</h1>
          <div :class="['availability-label', availabilityClass]">
            {{ availabilityLabel }}
          </div>
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

            <div class="price-display mb-3" aria-live="polite">
              Prezzo: <strong>€{{ computedPrice }}</strong>
            </div>

            <button
              type="button"
              class="btn btn-checkout"
              @click="handleAddToCart"
              :disabled="isOutOfStock"
            >
              {{ isOutOfStock ? 'Non disponibile' : (addedToCart ? 'Aggiunto al carrello!' : 'Aggiungi al carrello') }}
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
    <AppFooter class="container-fluid px-0" />
  </div>
</template>

<script>
import NewsletterBanner from '@/components/NewsletterBanner.vue';
import AppFooter from '@/components/AppFooter.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { NewsletterBanner, AppFooter },
  data() {
    return {
      selectedFormat: '',
      selectedPaper: '',
      selectedCustomization: '',
      addedToCart: false,
    };
  },
  computed: {
    ...mapGetters(['getPhotoById']),
    photo() {
      return this.getPhotoById(Number(this.$route.params.id));
    },
    formatOptions() {
      return ['30x40', '40x60', '50x70'];
    },
    paperOptions() {
      return ['Lucida', 'Opaca'];
    },
    customizationOptions() {
      return ['Cornice rovere', 'Cornice bianca'];
    },
    computedPrice() {
      const priceByFormat = { '30x40': 40, '40x60': 50, '50x70': 60 };
      return priceByFormat[this.selectedFormat] || 0;
    },
    availabilityLabel() {
      if (!this.photo) return '';
      const inv = this.photo.inventory ?? 0;
      if (inv > 5) return 'Disponibile';
      if (inv > 0) return 'In esaurimento';
      return 'Esaurito';
    },
    availabilityClass() {
      if (!this.photo) return '';
      const inv = this.photo.inventory ?? 0;
      if (inv > 5) return 'badge-available';
      if (inv > 0) return 'badge-limited';
      return 'badge-out';
    },
    isOutOfStock() {
      return this.photo && (this.photo.inventory ?? 0) === 0;
    }
  },
  mounted() {
    if (this.photo) {
      this.selectedFormat = this.photo.format || '';
      this.selectedPaper = this.photo.paper || '';
      this.selectedCustomization = this.photo.customization || '';
    }
  },
  methods: {
    ...mapActions({
      setPhotoOptions: 'setPhotoOptions',
      addItemToCart: 'addToCart',
    }),
    handleAddToCart() {
      if (this.isOutOfStock) return;
      this.setPhotoOptions({
        id: this.photo.id,
        options: {
          format: this.selectedFormat,
          paper: this.selectedPaper,
          customization: this.selectedCustomization,
        },
      });
      const item = {
        id: this.photo.id,
        title: this.photo.title,
        format: this.selectedFormat,
        paper: this.selectedPaper,
        customization: this.selectedCustomization,
        price: this.computedPrice,
      };
      this.addItemToCart(item);
      this.addedToCart = true;
      setTimeout(() => {
        this.addedToCart = false;
      }, 2000);
    },
  }
};
</script>

<style scoped>
.content-wrapper {
  padding-top: 70px;
}

.gallery-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #eee;
  border-radius: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 0;
  cursor: default;
}

h1 {
  font-weight: 700;
  margin-bottom: 1rem;
}

.availability-label {
  margin-bottom: 1rem;
  padding: 0.4rem 0.8rem;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 0.25rem;
  user-select: none;
  width: fit-content;
}

.badge-available {
  background-color: #a7c796;
  color: #413f3f;
}

.badge-limited {
  background-color: #f9bb86;
  color: #413f3f;
}

.badge-out {
  background-color: #e8a5a1;
  color: #413f3f;
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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f9f0ed;
  color: #413f3f;
}

.price-display {
  font-size: 1.5rem;
  font-weight: 700;
  color: #413f3f;
}

.btn-checkout {
  background-color: #b5cace;
  color: #413f3f;
  border: none;
  border-radius: 4px;
  padding: 0.95rem 1.35rem;
  font-weight: bold;
  font-size: 1.13rem;
  margin-bottom: 2.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(41,31,26,0.06);
}

.btn-checkout:hover:not(:disabled) {
  background-color: #b89c94;
}

.btn-checkout:disabled {
  background-color: #e8a5a1;
  cursor: not-allowed;
  color: #413f3f;
}

.btn-portfolio-back {
  color: #413f3f; /* colore testo simile al testo normale */
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  text-align: left;
}

.btn-portfolio-back:hover {
  color: #b89c94; /* colore hover, tono caldo e coordinato con btn-checkout */
  text-decoration: underline;
}
</style>
