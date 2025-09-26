<template>
  <div>
    <div
      id="heroCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
      aria-roledescription="carousel"
      aria-label="Carosello immagini viaggio design architettura"
    >
      <div class="carousel-inner h-100">
        <!-- Prima slide: immagine di copertina con animazione typing e click per About -->
        <div
          class="carousel-item active h-100"
          :style="{
            backgroundImage: `url('/images/header1.JPG')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            position: 'relative'
          }"
          role="button"
          tabindex="0"
          @click="$router.push({ name: 'About' })"
          @keydown.enter="$router.push({ name: 'About' })"
        >
          <!-- Overlay sfumato in basso per migliorare leggibilità testo -->
          <div class="tag-overlay"></div>
          <!-- Caption fissa in posizione bottom left con animazione typing -->
          <div class="fixed-caption">
            <p :class="['typewriter-large', { 'typing-complete': typingDone }]">
              {{ displayedText }}
            </p>
          </div>
        </div>

        <!-- Slide multiple per i tag Portfolio, immagini cliccabili con filtro -->
        <div
          v-for="tagItem in carouselTags"
          :key="tagItem.tag"
          class="carousel-item h-100"
        >
          <a
            href="#"
            @click.prevent="navigateToTag(tagItem.tag)"
            :style="{
              backgroundImage: `url(${tagItem.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              position: 'relative'
            }"
            class="ps-3 pb-4"
            role="button"
            tabindex="0"
            @keydown.enter.prevent="navigateToTag(tagItem.tag)"
          >
            <!-- Overlay sfumato sulla base immagine -->
            <div class="tag-overlay"></div>
            <!-- Caption tag in basso a sinistra, bianco e bold -->
            <div class="tag-caption fw-bold text-white">{{ tagItem.name }}</div>
          </a>
        </div>
      </div>

      <!-- Controllo precedente carosello -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <!-- Controllo successivo carosello -->
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      fullText: 'Fotografie di viaggio, design e architettura.',
      displayedText: '', // testo visualizzato in typing effect durante l'animazione
      typingDone: false, // flag per indicare se typing è finito
      carouselTags: [    // dati per immagini dinamiche dei tag del portfolio
        { tag: 'viaggio', name: 'Viaggio', img: '/images/viaggio.jpg' },
        { tag: 'design', name: 'Design', img: '/images/design.jpg' },
        { tag: 'architettura', name: 'Architettura', img: '/images/architettura.jpg' }
      ]
    };
  },
  mounted() {
    // Avvio animazione typing solo al caricamento componente
    this.typeWriterEffect();
  },
  methods: {
    typeWriterEffect() {
      let i = 0;
      const speed = 60; // velocità animazione, più basso è più veloce
      const fullText = this.fullText;
      const display = () => {
        if (i <= fullText.length) {
          this.displayedText = fullText.substring(0, i);
          i++;
          setTimeout(display, speed);
        } else {
          this.typingDone = true;
        }
      };
      display();
    },
    // Navigazione al portfolio filtrato per tag selezionato
    navigateToTag(tag) {
      this.$router.push({ name: 'PortfolioView', query: { tag } });
    }
  }
};
</script>

<style scoped>
/* Contenitore carosello full screen */
#heroCarousel {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

/* Ogni singola slide occupa 100% altezza viewport */
.carousel-item {
  height: 100vh;
}

/* Caption fissa in basso a sx sopra la slide attiva */
.fixed-caption {
  position: absolute;
  bottom: 2rem;
  left: 30px;
  max-width: 700px;
  z-index: 1060;
  pointer-events: none; /* disabilita interattività per non interferire */
  user-select: none;
  text-align: left;
}

/* Stile testo typing */
.fixed-caption p {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: white;
  margin: 0;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 0;
  word-spacing: 0;
}

/* Quando typing è finito cambia il comportamento white-space per andare a capo */
.typing-complete {
  white-space: normal !important;
  overflow-wrap: break-word !important;
  word-break: break-word !important;
}

/* Link all’interno di slide con stile neutro */
.carousel-item a {
  text-decoration: none;
  color: inherit;
  position: relative;
}

/* Filtri CSS per migliorare visibilità icone frecce carosello */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: drop-shadow(0 0 2px black) brightness(1.5);
}

/* Overlay sfumato in basso sulle immagini per migliorare leggibilità */
.tag-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  pointer-events: none; /* overlay non interagisce con mouse */
  z-index: 1055;
  border-radius: 0 0 5px 5px;
}

/* Testo tag sulle immagini in basso a sx, bold e monospace */
.tag-caption {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.2rem; 
  user-select: none;
  pointer-events: none;
  position: relative;
  z-index: 1060;
}
</style>
