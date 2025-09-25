<template>
  <div class="checkout-page container my-5 px-3">
    <form @submit.prevent="submitOrder" class="checkout-form mt-4">
      <h2>Dettagli Spedizione</h2>
      <input v-model="shipping.name" placeholder="Nome" required />
      <input v-model="shipping.surname" placeholder="Cognome" required />
      <input v-model="shipping.address" placeholder="Indirizzo" required />
      <input 
        v-model="shipping.cap" 
        placeholder="CAP" 
        required 
        pattern="^\d{5}$" 
        title="Inserisci esattamente 5 numeri" 
      />
      <input v-model="shipping.city" placeholder="Città" required />
      <input v-model="shipping.email" placeholder="Email" type="email" required />

      <h2>Metodo di Pagamento</h2>
      <select v-model="payment.method" required>
        <option disabled value="">Seleziona metodo</option>
        <option value="credit_card">Carta di credito</option>
        <option value="paypal">PayPal</option>
      </select>

      <div class="payment-summary mt-3">
        <div class="d-flex justify-content-between">
          <span>Totale parziale</span>
          <span>{{ cartTotal }} €</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Costo spedizione</span>
          <span v-if="cartTotal < FREE_SHIPPING_THRESHOLD">8€</span>
          <span v-else>Spedizione gratuita</span>
        </div>
        <hr />
        <div class="d-flex justify-content-between fw-bold">
          <span>Totale</span>
          <span>{{ cartTotalWithShipping }} €</span>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-checkout mt-3" :disabled="cartTotalWithShipping === 0">
          Paga {{ cartTotalWithShipping }} €
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

const FREE_SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 8;

export default {
  components: { AppFooter },
  data() {
    return {
      shipping: { name: '', surname: '', address: '', cap: '', city: '', email: '' },
      payment: { method: '' },
      orderSubmitted: false
    };
  },
  computed: {
    ...mapGetters(['cartTotal']),
    cartTotalWithShipping() {
      if (this.cartTotal === 0) return 0;
      if (this.cartTotal < FREE_SHIPPING_THRESHOLD) {
        return this.cartTotal + SHIPPING_COST;
      }
      return this.cartTotal;
    },
    FREE_SHIPPING_THRESHOLD() {
      return FREE_SHIPPING_THRESHOLD;
    }
  },
  methods: {
    submitOrder() {
      const capRegex = /^\d{5}$/;
      if (!capRegex.test(this.shipping.cap)) {
        alert('Il CAP deve contenere esattamente 5 numeri.');
        return;
      }

      if (this.cartTotalWithShipping === 0) {
        alert('Il carrello è vuoto, aggiungi almeno un prodotto.');
        return;
      }
      this.orderSubmitted = true;
      this.$store.commit('CLEAR_CART'); // svuota carrello al pagamento

      // Redirect automatico alla homepage dopo 2 secondi
      setTimeout(() => {
        this.$router.push('/');
      }, 2000);
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

.payment-summary {
  background: #f9f8f6;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  color: #413f3f;
}

.payment-summary div {
  margin-bottom: 0.5rem;
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

.order-message {
  font-weight: 600;
  font-size: 1.1rem;
  color: #413f3f;
}
</style>
