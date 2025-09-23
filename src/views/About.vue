<template>
  <div>
    <!-- Header foto con overlay opaco e testo in Courier -->
    <div
      class="position-relative w-100"
      style="height: 700px; background-image: url('/images/Daisy.JPG'); background-size: cover; background-position: center;"
    >
      <div class="tag-overlay"></div>
      <div class="position-absolute bottom-0 mb-5 text-start" style="max-width: 700px; left: 50px;">
        <p class="typewriter-large mb-1">
          Ho fatto delle foto.<br />
          Ho fotografato invece di parlare.<br />
          Ho fotografato per non dimenticare.<br />
          Per non smettere di guardare.
        </p>
        <p class="typewriter-author">-Daniel Pennac-</p>
      </div>
    </div>

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
