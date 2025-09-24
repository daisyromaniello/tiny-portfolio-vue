<template>
  <div>
    <div class="container-fluid px-0 my-4 content-wrapper">
      <div class="instructions-text text-center mx-auto mb-3" style="max-width: 700px;">
        Vuoi acquistare una mia fotografia fine art?<br />
        Scorri la gallery e clicca sulla tua foto preferita per vedere le opzioni di stampa.
      </div>

      <!-- Filtro tag e ricerca personalizzata -->
      <div class="mb-3 px-3">
        <div class="search-wrapper mx-auto" style="max-width: 500px;">
          <div class="input-group rounded-pill border border-1 border-e0b3a4 shadow-sm overflow-visible">
            <input
              type="search"
              class="form-control border-0 px-3"
              placeholder="Cerca per titolo, descrizione o tag"
              aria-label="Search"
              v-model="q"
              @input="apply"
              :class="{ 'text-e0b3a4': !q, 'text-413f3f bg-e0b3a4': q }"
            />
            <button class="btn btn-transparent p-0 px-3" type="button" @click="apply" aria-label="Submit Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#e0b3a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          <div class="d-flex justify-content-center gap-2 mt-3">
            <button 
              class="tag-pill"
              v-for="tag in ['viaggio', 'architettura', 'design']"
              :key="tag"
              @click="filterTag(tag)"
              :class="{ selected: q === tag }"
            >
              {{ tag }}
            </button>
          </div>
          <div class="reset-container text-center mt-2">
            <button class="btn btn-link reset-btn p-0" @click="clearFilter">Reset</button>
          </div>
        </div>
      </div>

      <!-- Uso del componente PortfolioGallery -->
      <PortfolioGallery
        :photos="photosToShow"
        @openDetail="selectPhoto"
      />

    </div>
    <NewsletterBanner />
    <AppFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewsletterBanner from '@/components/NewsletterBanner.vue';
import AppFooter from '@/components/AppFooter.vue';
import PortfolioGallery from '@/components/PortfolioGallery.vue';

export default {
  name: 'PortfolioView',
  components: { NewsletterBanner, AppFooter, PortfolioGallery },
  data() {
    return {
      q: this.$route.query.tag || '',
      photosToShow: []
    };
  },
  computed: {
    ...mapGetters(['filteredPhotos'])
  },
  created() {
    this.photosToShow = this.filteredPhotos(this.q);
  },
  watch: {
    q(newQ) {
      this.photosToShow = this.filteredPhotos(newQ);
    }
  },
  methods: {
    apply() {
      this.photosToShow = this.filteredPhotos(this.q);
    },
    filterTag(tag) {
      this.q = tag;
      this.photosToShow = this.filteredPhotos(tag);
    },
    clearFilter() {
      this.q = '';
      this.photosToShow = this.filteredPhotos('');
    },
    selectPhoto(id) {
      this.$router.push({ name: 'PhotoDetail', params: { id } });
    },
  }
};
</script>

<style scoped>
.instructions-text {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  max-width: 700px;
  color: #424242;
  margin-bottom: 0.8rem;
}

.content-wrapper {
  padding-top: 70px;
}

.tag-pill {
  padding: 6px 14px;
  border-radius: 30px;
  border: 1px solid #b5cace;
  background-color: transparent;
  color: #b5cace;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  user-select: none;
}

.tag-pill:hover {
  background-color: #b5cace;
  color: #413f3f;
}

.tag-pill.selected {
  background-color: #e0b3a4;
  border-color: #e0b3a4;
  color: #413f3f;
}

.reset-container {
  text-align: center;
  margin-top: 0.1rem;
  margin-bottom: 0;
}

.reset-btn {
  padding-left: 0;
  font-size: 0.9rem;
  user-select: none;
  cursor: pointer;
  color: #b5cace;
}

.reset-btn:hover {
  color: #e0b3a4;
}

.search-wrapper {
  margin: 0.1rem auto 0.3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.input-group {
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  overflow: visible;
  border: 1px solid #e0b3a4;
}
</style>
