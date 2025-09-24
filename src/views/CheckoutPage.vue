<template>
  <div class="checkout-page container my-5 px-3">
    <div class="order-summary mt-4">
      <h3>Totale Ordine: {{ cartTotal }} €</h3>
    </div>

    <form @submit.prevent="submitOrder" class="checkout-form mt-4">
      <h2>Dettagli Spedizione</h2>
      <input v-model="shipping.name" placeholder="Nome" required />
      <input v-model="shipping.surname" placeholder="Cognome" required />
      <input v-model="shipping.address" placeholder="Indirizzo" required />
      <input v-model="shipping.email" placeholder="Email" type="email" required />

      <h2>Metodo di Pagamento</h2>
      <select v-model="payment.method" required>
        <option disabled value="">Seleziona metodo</option>
        <option value="credit_card">Carta di credito</option>
        <option value="paypal">PayPal</option>
      </select>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-checkout mt-3" :disabled="cartTotal === 0">
          Paga
        </button>
      </div>
    </form>

    <p v-if="orderSubmitted" class="order-message mt-3 text-center">
  Grazie per il tuo acquisto!<br>Controlla la mail per la conferma d'ordine.
</p>
  </div>

  <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import { mapGetters } from 'vuex';

export default {
  components: { AppFooter },
  data() {
    return {
      shipping: { name: '', surname: '', address: '', email: '' },
      payment: { method: '' },
      orderSubmitted: false
    };
  },
  computed: {
    ...mapGetters(['cartTotal']),
  },
  methods: {
    submitOrder() {
      if (this.cartTotal === 0) {
        alert('Il carrello è vuoto, aggiungi almeno un prodotto.');
        return;
      }
      this.orderSubmitted = true;
      // Qui potresti aggiungere la logica di invio dati al backend
    }
  }
};
</script>

<style scoped>
.checkout-page {
  max-width: 510px;
  margin: 0 auto;
  padding: 1.2rem 1.2rem 3.2rem 1.2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 28px rgba(41,31,26,0.08);
}

@media (max-width: 600px) {
  .checkout-page {
    max-width: 97vw;
    padding: 1.2rem 0.5rem 4rem 0.5rem;
    border-radius: 0;
    box-shadow: none;
  }
}

.checkout-form input,
.checkout-form select {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ede3d3;
  border-radius: 4px;
  font-size: 1.06rem;
  background: #f9f8f6;
}

.checkout-form input:focus,
.checkout-form select:focus {
  border-color: #b5cace;
  outline: none;
  background: #fff;
}

.btn-checkout {
  background-color: #b5cace;
  color: #413f3f;
  border: none;
  border-radius: 4px;
  padding: 0.95rem 1.35rem;
  font-weight: bold;
  font-size: 1.13rem;
  margin-bottom: 2.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(41,31,26,0.06);
}

.btn-checkout:hover:enabled {
  background-color: #b89c94;
}

.btn-checkout:disabled {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
}

.order-summary {
  font-weight: bold;
  font-size: 1.13rem;
  margin-bottom: 1.4rem;
}

.order-message {
  font-weight: 600;
  font-size: 1.1rem;
  color: #413f3f;
}
</style>
