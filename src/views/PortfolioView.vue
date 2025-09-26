<template>
  <div>
    <!-- Wrapper principale con padding e margini personalizzati -->
    <div class="container-fluid px-0 my-4 content-wrapper">

      <!-- Testo istruzioni centrato max 700px -->
      <div class="instructions-text text-center mx-auto mb-3" style="max-width: 700px;">
        Vuoi acquistare una mia fotografia fine art?<br />
        Scorri la gallery e clicca sulla tua foto preferita per vedere le opzioni di stampa.
      </div>

      <!-- Sezione filtro tag + ricerca -->
      <div class="mb-3 px-3">
        <div class="search-wrapper mx-auto" style="max-width: 500px;">
          <div class="input-group rounded-pill border border-1 border-e0b3a4 shadow-sm overflow-visible">
            <!-- Input di ricerca legato al modello q -->
            <input
              type="search"
              class="form-control border-0 px-3"
              placeholder="Cerca per titolo, descrizione o tag"
              aria-label="Search"
              v-model="q"
              @input="apply"   
              :class="{ 'text-e0b3a4': !q, 'text-413f3f bg-e0b3a4': q }"
            />
            <!-- Bottone per eseguire la ricerca -->
            <button class="btn btn-transparent p-0 px-3" type="button" @click="apply" aria-label="Submit Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#e0b3a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          <!-- Bottoni filtro per tag con classe dinamica per selezione -->
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

          <!-- Pulsante reset per togliere filtro ricerca/tag -->
          <div class="reset-container text-center mt-2">
            <button class="btn btn-link reset-btn p-0" @click="clearFilter">Reset</button>
          </div>
        </div>
      </div>

      <!-- Lista galleria foto filtrate da visualizzare -->
      <PortfolioGallery
        :photos="photosToShow"
        @openDetail="selectPhoto"
      />
    </div>

    <!-- Banner newsletter e footer -->
    <NewsletterBanner />
    <AppFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import AppFooter from '@/components/AppFooter.vue'
import PortfolioGallery from '@/components/PortfolioGallery.vue'

export default {
  name: 'PortfolioView',
  components: { NewsletterBanner, AppFooter, PortfolioGallery },
  data() {
    return {
      // Stato query search/tag inizializzato da parametro URL query
      q: this.$route.query.tag || ''
    }
  },
  computed: {
    // Ottengo le foto filtrate usando il getter Vuex con query q
    ...mapGetters(['filteredPhotos']),
    photosToShow() {
      return this.filteredPhotos(this.q)
    }
  },
  created() {
    // Carico le foto dallo store all'inizializzazione del componente
    this.$store.dispatch('fetchPhotos')
  },
  methods: {
    // Metodo trigger aggiornamento binding ricerca (vuoto ma utile)
    apply() {
    },
    // Imposta filtro tag q
    filterTag(tag) {
      this.q = tag
    },
    // Resetta filtro ricerca
    clearFilter() {
      this.q = ''
    },
    // Seleziona foto e va al dettaglio con routing
    selectPhoto(id) {
      this.$router.push({ name: 'PhotoDetail', params: { id } })
    }
  }
}
</script>

<style scoped>
/* Stile testo istruzioni monospace, colore e spaziatura */
.instructions-text {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  max-width: 700px;
  color: #424242;
  margin-bottom: 0.8rem;
}

/* Wrapper pagine, padding per offset navbar */
.content-wrapper {
  padding-top: 70px;
}

/* Stile dei bottoni filtro tag */
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

/* Container per pulsante reset centrato */
.reset-container {
  text-align: center;
  margin-top: 0.1rem;
  margin-bottom: 0;
}

/* Stile pulsante reset link */
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

/* Wrapper ricerca con padding e margini */
.search-wrapper {
  margin: 0.1rem auto 0.3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

/* Gruppo input ricerca con ombra e bordi arrotondati */
.input-group {
  background-color: transparent;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  overflow: visible;
  border: 1px solid #e0b3a4;
}
</style>
