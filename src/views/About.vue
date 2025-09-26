<template>
  <div>
    <!-- Header con immagine di sfondo, overlay sfumato e testo in Courier -->
    <div
      class="position-relative w-100"
      style="height: 700px; background-image: url('/images/Daisy.JPG'); background-size: cover; background-position: center;"
    >
      <!-- Overlay sfumato scuro in basso per migliorare leggibilità testo -->
      <div class="tag-overlay"></div>
      <!-- Box testo posizionato in basso a sinistra con padding, max-width e z-index più alto -->
      <div class="position-absolute bottom-0 mb-5 text-start text-white text-overlay" style="max-width: 700px; left: 50px;">
        <!-- Testo principale tipografia Courier monospace con spacing e grandezza personalizzata -->
        <p class="typewriter-large mb-1">
          Ho fatto delle foto.<br />
          Ho fotografato invece di parlare.<br />
          Ho fotografato per non dimenticare.<br />
          Per non smettere di guardare.
        </p>
        <!-- Autore testo in corsivo monospace -->
        <p class="typewriter-author">-Daniel Pennac-</p>
      </div>
    </div>

    <!-- Main container con testo descrittivo ed elementi impaginati con margini e padding -->
    <main class="container my-5 py-5">
      <p>
        A sei anni immaginavo il mio futuro come archeologa, astronoma e scrittrice. Tutto insieme, perché non mi è mai bastato fare una cosa alla volta.
      </p>
      <p>
        Alla fine, sono rimasta con la penna in mano e la macchina fotografica al collo, perché raccontare per parole e immagini è quello che mi riesce meglio.
      </p>
      <p>
        Le parole che mi calzano meglio sono quelle misurate, non una in più, non una in meno, i pensieri ordinati in fila indiana. Non posso fare a meno di fotografare dettagli che colgo solo io, rincorro i giochi di luce e mi piacciono le foto dalle prospettive perfette.
      </p>
      <p>
        Il resto, è una storia ancora da inventare.
      </p>
    </main>

    <!-- Componenti banner newsletter e footer riutilizzabili -->
    <NewsletterBanner />
    <AppFooter />
  </div>
</template>

<script>
import NewsletterBanner from '@/components/NewsletterBanner.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'AboutPage',
  components: { NewsletterBanner, AppFooter }
};
</script>

<style scoped>
/* Overlay sfumato scuro posto in basso nell'immagine header */
.tag-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%);
  pointer-events: none; /* Overlay non interferisce con eventi mouse */
  z-index: 1055;
  border-radius: 0 0 5px 5px;
}

/* Testo sopra al layer con z-index più alto */
.text-overlay {
  z-index: 1060;
}

/* Testo principale in Courier New, bianco con shadow per migliore leggibilità */
.typewriter-large {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 0;
  word-spacing: 0;
  font-size: 1.2rem;
}

/* Testo autore in corsivo monospace, anche bianco con shadow */
.typewriter-author {
  font-family: 'Courier New', monospace;
  font-style: italic;
  font-weight: normal;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

/* Stile paragrafi del main con colore e spaziatura */
p {
  font-size: 1rem;
  color: #424242;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}
</style>
