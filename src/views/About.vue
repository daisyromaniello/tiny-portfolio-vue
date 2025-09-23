<template>
  <div>
    <MainNavbar />

    <!-- Header foto con overlay opaco e testo in Courier -->
    <div
      class="position-relative w-100"
      style="height: 700px; background-image: url('/images/Daisy.JPG'); background-size: cover; background-position: center;"
    >
      <div class="tag-overlay"></div>
      <div
        class="position-absolute bottom-0 mb-5 text-start"
        style="max-width: 700px; left: 50px;"
      >
        <p class="typewriter-large mb-1">
          Ho fatto delle foto.<br />
          Ho fotografato invece di parlare.<br />
          Ho fotografato per non dimenticare.<br />
          Per non smettere di guardare.
        </p>
        <p class="typewriter-author">
          -Daniel Pennac-
        </p>
      </div>
    </div>

    <main class="container my-5 py-5">
      <p>
        A sei anni immaginavo il mio futuro nei panni di archeologa, astronoma e scrittrice. Tutto insieme, perchè non mi è mai bastato fare una cosa alla volta.
      </p>
      <p>
        Una volta inteso che i sogni fanno i conti con il talento e che non avrei avuto abbastanza memoria e familiarità con i numeri per i primi due, sono rimasta con la penna in mano, perché alla fine dei conti scrivere è sempre stato quello che mi riesce meglio di tutto.
      </p>
      <p>
        Le parole che mi calzano meglio sono quelle misurate, non una in più, non una in meno, i pensieri ordinati in fila indiana.
      </p>
      <p>
        Oggi disegno strategie digitali e invento contenuti creativi, vengo ricordata come l’inesperta di Groupon, scopro la mia regione insieme a Instagramers Piemonte e sono contributor di CasaFacile.
      </p>
      <p>
        Nel tempo libero, viaggio meno di quanto vorrei e ho una check-list dove appunto tutti i paesi che visito (ad oggi 53 in 5 continenti). Ballo lindy hop, fotografo e posto le foto su Instagram, amo scoprire la mia città, Torino, e mi circondo di persone ironiche e ciniche quanto me. Nel frattempo, continuo ad appassionarmi a più cose di quante possa farne.
      </p>
      <p>Il resto, è una storia ancora da inventare.</p>
    </main>

    <NewsletterBanner />
    <Footer />
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AboutPage',
  components: { MainNavbar, NewsletterBanner, Footer },
}
</script>

<style scoped>
.tag-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%);
  pointer-events: none;
  z-index: 1055;
  border-radius: 0 0 5px 5px;
}

.typewriter-large {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: white;
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 0;
  word-spacing: 0;
  font-size: 1.2rem;
}

.typewriter-author {
  font-family: 'Courier New', monospace;
  font-style: italic;
  font-weight: normal;
  color: white;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

p {
  font-size: 1rem;
  color: #424242;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}
</style>
