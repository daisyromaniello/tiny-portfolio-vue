<template>
  <div class="checkout-page container my-5 px-3">
    <!-- Form checkout con gestione submit personalizzata -->
    <form @submit.prevent="submitOrder" class="checkout-form mt-4">
      <!-- Sezione dettagli spedizione -->
      <h2>Dettagli Spedizione</h2>
      <!-- Input nome -->
      <input class="form-control mb-3" v-model="shipping.name" placeholder="Nome" required />
      <!-- Input cognome -->
      <input class="form-control mb-3" v-model="shipping.surname" placeholder="Cognome" required />
      <!-- Input indirizzo -->
      <input class="form-control mb-3" v-model="shipping.address" placeholder="Indirizzo" required />
      <!-- Input CAP con validazione pattern 5 cifre -->
      <input 
        class="form-control mb-3"
        v-model="shipping.cap"
        placeholder="CAP"
        required
        pattern="^\d{5}$"
        title="Inserisci esattamente 5 numeri"
      />
      <!-- Input città -->
      <input class="form-control mb-3" v-model="shipping.city" placeholder="Città" required />
      <!-- Input email con validazione tipo email -->
      <input class="form-control mb-3" v-model="shipping.email" placeholder="Email" type="email" required />

      <!-- Sezione metodo di pagamento -->
      <h2>Metodo di Pagamento</h2>
      <!-- Select metodo di pagamento -->
      <select class="form-select mb-3" v-model="payment.method" required>
        <option disabled value="">Seleziona metodo</option>
        <option value="credit_card">Carta di credito</option>
        <option value="paypal">PayPal</option>
      </select>

      <!-- Riepilogo costi ordine -->
      <div class="payment-summary mt-3 p-3 bg-light rounded">
        <div class="d-flex justify-content-between mb-2">
          <span>Totale parziale</span>
          <span>{{ cartTotal }} €</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Costo spedizione</span>
          <span v-if="cartTotal < FREE_SHIPPING_THRESHOLD">8€</span>
          <span v-else>Spedizione gratuita</span>
        </div>
        <hr />
        <div class="d-flex justify-content-between fw-bold fs-5">
          <span>Totale</span>
          <span>{{ cartTotalWithShipping }} €</span>
        </div>
      </div>

      <!-- Bottone pagamento centrato, disabilitato se importo zero -->
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-custom-primary mt-3" :disabled="cartTotalWithShipping === 0">
          Paga {{ cartTotalWithShipping }} €
        </button>
      </div>
    </form>

    <!-- Messaggio conferma ordine dopo invio -->
    <p v-if="orderSubmitted" class="order-message mt-3 text-center">
      Grazie per il tuo acquisto!<br>Controlla la mail per la conferma d'ordine.
    </p>
  </div>

  <!-- Footer componente -->
  <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import { mapGetters } from 'vuex';

const FREE_SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 8;

export default {
  components: { AppFooter },
  data() {
    return {
      shipping: { name: '', surname: '', address: '', cap: '', city: '', email: '' },
      payment: { method: '' },
      orderSubmitted: false,
    };
  },
  computed: {
    ...mapGetters(['cartTotal']), // getter Vuex per totale carrello
    cartTotalWithShipping() {
      if (this.cartTotal === 0) return 0;
      if (this.cartTotal < FREE_SHIPPING_THRESHOLD) {
        return this.cartTotal + SHIPPING_COST;
      }
      return this.cartTotal;
    },
    FREE_SHIPPING_THRESHOLD() {
      return FREE_SHIPPING_THRESHOLD;
    },
  },
  methods: {
    submitOrder() {
      // Validazione CAP 5 cifre esatte
      const capRegex = /^\d{5}$/;
      if (!capRegex.test(this.shipping.cap)) {
        alert('Il CAP deve contenere esattamente 5 numeri.');
        return;
      }

      // Verde se carrello vuoto
      if (this.cartTotalWithShipping === 0) {
        alert('Il carrello è vuoto, aggiungi almeno un prodotto.');
        return;
      }

      // Flag stato ordine inviato per messaggio conferma
      this.orderSubmitted = true;
      // Reset carrello Vuex
      this.$store.commit('CLEAR_CART');

      // Redirect home dopo 2 secondi
      setTimeout(() => {
        this.$router.push('/');
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* Wrapper checkout con max-width e stile box */
.checkout-page {
  max-width: 510px;
  margin: 0 auto;
  padding: 1.2rem 1.2rem 3.2rem 1.2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 28px rgba(41,31,26,0.08);
}

/* Responsive: padding per spaziature verticali maggiori su media */
@media (max-width: 768px) {
  .checkout-page {
    padding: 160px 1.2rem 3.2rem 1.2rem;
  }
}

@media (max-width: 600px) {
  .checkout-page {
    max-width: 97vw;
    padding: 180px 0.5rem 4rem 0.5rem;
    border-radius: 0;
    box-shadow: none;
  }
}

/* Bottone personalizzato colore e stile */
.btn-custom-primary {
  background-color: #b5cace !important;
  color: #413f3f !important;
  border: none !important;
  box-shadow: 0 2px 6px rgba(41,31,26,0.06);
  transition: background-color 0.2s ease;
}

.btn-custom-primary:hover:enabled {
  background-color: #b89c94 !important;
}

/* Messaggio conferma ordine */
.order-message {
  font-weight: 600;
  font-size: 1.1rem;
  color: #413f3f;
}
</style>
