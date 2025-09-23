<template>
  <div>
    <div class="container my-4 content-wrapper">
      <div class="row align-items-center gy-4 full-height-row">
        <!-- Foto a sinistra -->
        <div class="col-12 col-md-6 photo-container">
          <img
            src="/images/contattiAtinyPortfolio.jpg"
            alt="Contatti"
            class="gallery-image img-fluid"
          />
        </div>

        <!-- Modulo contatti a destra -->
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center form-container">
          <h2 class="mb-3">Restiamo in contatto</h2>
          <p class="mb-4 description-text">
            Se ti piace la fotografia, vuoi raccontarmi i tuoi progetti o hai dei suggerimenti, contattami.
          </p>

          <form @submit.prevent="submitForm" novalidate>
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
                placeholder="Nome *"
              />
            </div>

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
                placeholder="Email *"
              />
            </div>

            <div class="mb-3">
              <textarea
                id="messaggio"
                name="messaggio"
                class="form-control"
                v-model="form.messaggio"
                rows="5"
                required
                aria-required="true"
                placeholder="Messaggio *"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary align-self-start">Invia</button>
          </form>
        </div>
      </div>
    </div>
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
      form: {
        nome: '',
        email: '',
        messaggio: '',
      },
    };
  },
  methods: {
    submitForm() {
      if (this.form.nome && this.form.email && this.form.messaggio) {
        alert(`Grazie ${this.form.nome}, il tuo messaggio è stato inviato!`);
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
.content-wrapper {
  padding-top: 70px;
}

/* Righe a tutta altezza per viewport */
.full-height-row {
  min-height: calc(100vh - 70px); /* viewport meno altezza navbar */
}

/* Foto e modulo a 100% altezza riga */
.photo-container,
.form-container {
  height: 100%;
}

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

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2.mb-3 {
  font-weight: 700;
  color: #413f3f;
  margin-bottom: 1rem;
}

.description-text {
  font-weight: 400;
  color: #413f3f;
  margin-left: 0;
  padding-left: 0;
}

input.form-control,
textarea.form-control {
  border: 1px solid #b89c94;
  border-radius: 0.25rem;
  padding: 10px 15px;
  font-size: 1rem;
  color: #413f3f;
  background-color: #f9f0ed;
}

input::placeholder,
textarea::placeholder {
  color: #7a726f;
  opacity: 1;
  font-style: normal;
}

.btn-primary {
  background-color: #e0b3a4;
  border: none;
  padding: 0.6rem 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #c79484;
}

.btn-primary.align-self-start {
  align-self: flex-start;
}
</style>
