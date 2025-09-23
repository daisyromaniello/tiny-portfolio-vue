<template>
  <div>
    <MainNavbar />
    <div class="container-fluid px-0 my-4 content-wrapper">

      <div class="instructions-text">
        Vuoi acquistare una mia fotografia fine art?<br />
        Scorri la gallery e clicca sulla tua foto preferita per vedere le opzioni di stampa.
      </div>

      <!-- Filtro tag e ricerca personalizzata -->
      <div class="mb-3 px-3">
        <div class="search-wrapper">
          <div class="input-group">
            <input
              type="search"
              class="form-control search-input"
              placeholder="Cerca per titolo, descrizione o tag"
              aria-label="Search"
              v-model="q"
              @input="apply"
            />
            <button class="btn search-btn" type="button" @click="apply" aria-label="Submit Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#e0b3a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          <div class="d-flex justify-content-center gap-2 mt-3">
            <button class="tag-pill" v-for="tag in ['viaggio', 'architettura', 'design']" :key="tag" @click="filterTag(tag)" :class="{ selected: q === tag }">
              {{ tag }}
            </button>
          </div>
          <div class="reset-container">
            <button class="btn btn-link reset-btn" @click="clearFilter">Reset</button>
          </div>
        </div>
      </div>

      <!-- Gallery con overlay titolo centrato -->
      <section class="gallery-bootstrap-grid py-3">
        <div class="row gy-4">
          <div v-for="(photo, index) in photosToShow" :key="photo.id" :class="getColClass(index)">
            <div class="gallery-item position-relative" @click="selectPhoto(photo.id)">
              <img :src="photo.url" :alt="photo.title" class="gallery-image w-100" />
              <div class="gallery-caption d-flex flex-column justify-content-center align-items-center text-center">
                <div class="title">{{ photo.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <NewsletterBanner />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainNavbar from '@/components/MainNavbar.vue'
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'PortfolioView',
  components: { MainNavbar, NewsletterBanner, Footer },
  data() {
    return {
      q: this.$route.query.tag || '',
      photosToShow: []
    }
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
    getColClass(index) {
      return (index % 5) < 3 ? 'col-12 col-sm-6 col-lg-4' : 'col-12 col-sm-6 col-lg-6';
    }
  }
}
</script>

<style scoped>
.instructions-text {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  max-width: 600px;
  color: #424242;
  text-align: center;
  margin-bottom: 0.8rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.content-wrapper {
  padding-top: 70px;
}

.gallery-bootstrap-grid {
  padding-bottom: 32px;
  padding-top: 32px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  background: #fff;
  border: 1px solid #b5cace;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  border-radius: 0;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.85);
  z-index: 121;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #eee;
  border-radius: 0;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 0;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.1);
}

.gallery-caption {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  text-align: center;
}

.gallery-item:hover .gallery-caption {
  opacity: 1;
}

.gallery-caption .title {
  font-size: 1.1rem;
  font-family: Courier, monospace;
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
  max-width: 500px;
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

.search-input {
  border: none;
  padding: 8px 12px;
  font-size: 1rem;
  color: #e0b3a4;
  background: transparent;
  outline: none;
}

.search-input::placeholder {
  color: #e0b3a4;
}

.search-input:focus {
  color: #413f3f;
  background-color: #e0b3a4;
  box-shadow: none;
}

.search-btn {
  background-color: transparent;
  border: none;
  padding: 0 1.25rem;
  cursor: pointer;
}

.search-btn svg {
  stroke: #e0b3a4;
  transition: stroke 0.3s ease;
}

.search-btn:hover svg {
  stroke: #413f3f;
}
</style>
