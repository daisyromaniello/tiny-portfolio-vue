<template>
  <div>
    <!-- Wrapper principale con padding per compensare navbar -->
    <div class="container my-4 content-wrapper">

      <!-- Righe a tutta altezza viewport con gap verticale -->
      <div class="row align-items-center gy-4 full-height-row">

        <!-- Colonna immagine foto contatti a sinistra -->
        <div class="col-12 col-md-6 photo-container">
          <img
            src="/images/contattiAtinyPortfolio.jpg"
            alt="Contatti"
            class="gallery-image img-fluid"
          />
        </div>

        <!-- Colonna modulo contatti a destra, con layout flessibile verticale -->
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center form-container">
          <!-- Intestazione modulo -->
          <h2 class="mb-3">Restiamo in contatto</h2>
          <p class="mb-4 description-text">
            Se ti piace la fotografia, vuoi raccontarmi i tuoi progetti o hai dei suggerimenti, contattami.
          </p>

          <!-- Form con gestione submit personalizzata -->
          <form @submit.prevent="submitForm" novalidate>

            <!-- Input testo nome con binding v-model -->
            <div class="mb-3">
              <input
                id="nome"
                name="nome"
                type="text"
                class="form-control"
                v-model="form.nome"
                required
                autocomplete="given-name"
                aria-required="true"
                placeholder="Nome"
              />
            </div>

            <!-- Input email con validazione base -->
            <div class="mb-3">
              <input
                id="email"
                name="email"
                type="email"
                class="form-control"
                v-model="form.email"
                required
                autocomplete="email"
                aria-required="true"
                placeholder="Email"
              />
            </div>

            <!-- Textarea messaggio con binding v-model -->
            <div class="mb-3">
              <textarea
                id="messaggio"
                name="messaggio"
                class="form-control"
                v-model="form.messaggio"
                rows="5"
                required
                aria-required="true"
                placeholder="Messaggio"
              ></textarea>
            </div>

            <!-- Bottone invio modulo -->
            <button type="submit" class="btn btn-primary align-self-start">Invia</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Footer del sito -->
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'ContattiView',
  components: { AppFooter },
  data() {
    return {
      // Stato form per nome, email e messaggio
      form: {
        nome: '',
        email: '',
        messaggio: '',
      },
    };
  },
  methods: {
    // Metodo submit form con validazione base e alert messaggio
    submitForm() {
      if (this.form.nome && this.form.email && this.form.messaggio) {
        alert(`Grazie ${this.form.nome}, il tuo messaggio è stato inviato!`);
        // Reset form dopo invio
        this.form.nome = '';
        this.form.email = '';
        this.form.messaggio = '';
      } else {
        alert('Completa tutti i campi obbligatori!');
      }
    },
  },
};
</script>

<style scoped>
/* Padding su wrapper principale per offset navbar */
.content-wrapper {
  padding-top: 70px;
}

/* Riga a tutta altezza viewport, meno navbar */
.full-height-row {
  min-height: calc(100vh - 70px);
}

/* Contenitori immagine e form a 100% altezza riga */
.photo-container,
.form-container {
  height: 100%;
}

/* Stile immagine responsive con ombre */
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #eee;
  border-radius: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  overflow: hidden;
}

/* Form container usa flexbox con colonna e centratura verticale */
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Titolo modulo con margine e colore */
h2.mb-3 {
  font-weight: 700;
  color: #413f3f;
  margin-bottom: 1rem;
}

/* Testo descrizione modulo */
.description-text {
  font-weight: 400;
  color: #413f3f;
  margin-left: 0;
  padding-left: 0;
}

/* Stile basi input e textarea del form */
input.form-control,
textarea.form-control {
  border: 1px solid #b89c94;
  border-radius: 0.25rem;
  padding: 10px 15px;
  font-size: 1rem;
  color: #413f3f;
  background-color: #f9f0ed;
}

/* Stili placeholder */
input::placeholder,
textarea::placeholder {
  color: #7a726f;
  opacity: 1;
  font-style: normal;
}

/* Stile bottone invia modulo con colori personalizzati */
.btn-primary {
  background-color: #e0b3a4;
  border: none;
  padding: 0.6rem 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Hover bottone */
.btn-primary:hover {
  background-color: #c79484;
}

/* Bottone allineato a sinistra */
.btn-primary.align-self-start {
  align-self: flex-start;
}
</style>
