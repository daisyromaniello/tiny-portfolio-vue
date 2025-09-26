<template>
  <!-- Dropdown carrello visibile condizionato da isDropdownVisible -->
  <div v-if="isDropdownVisible" class="cart-dropdown shadow rounded bg-white p-4" role="dialog" aria-modal="true">
    <!-- Messaggio spedizione gratuita con stile monospace e grigio -->
    <div class="shipping-message mb-3 fw-semibold text-secondary" style="letter-spacing: 0.03em;">
      Spedizione gratuita per ordini sopra <strong class="text-dark">{{ freeShippingThreshold }}€</strong>
    </div>

    <!-- Barra di progresso per progresso spedizione gratuita -->
    <div class="progress progress-sm mb-4" style="height: 6px; border-radius: 4px; background-color: #ede3d3;">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: freeShippingPercent + '%', backgroundColor: '#b5cace' }"
        :aria-valuenow="freeShippingPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <!-- Lista articoli nel carrello, chiave unica combinando id e opzioni -->
    <div
      v-for="item in cart"
      :key="item.id + item.format + item.paper + item.customization"
      class="d-flex align-items-center mb-3"
    >
      <div class="flex-grow-1">
        <!-- Titolo e dettagli formato -->
        <div class="fw-bold mb-1">{{ item.title }}</div>
        <div class="text-muted small">{{ item.format }} cm</div>
        <!-- Prezzo articolo -->
        <div class="text-dark fw-semibold">{{ item.price }} €</div>
      </div>

      <!-- Controlli quantità con pulsanti meno e più -->
      <div class="d-flex align-items-center gap-2 mx-3 qty-clickable" role="group">
        <button
          class="btn btn-sm btn-qty"
          @click.stop.prevent="decrementQty(item)"
          aria-label="Riduci quantità"
          style="min-width: 30px; padding: 0;"
        >
          -
        </button>
        <span class="fw-semibold cursor-pointer" @click.stop.prevent="incrementQty(item)">{{ item.qty }}</span>
        <button
          class="btn btn-sm btn-qty"
          @click.stop.prevent="incrementQty(item)"
          aria-label="Aumenta quantità"
          style="min-width: 30px; padding: 0;"
        >
          +
        </button>
      </div>

      <!-- Pulsante per rimuovere articolo -->
      <button
        class="btn btn-link p-0 btn-remove"
        @click.stop.prevent="removeItem(item)"
        aria-label="Rimuovi articolo"
      >
        &times;
      </button>
    </div>

    <!-- Totale parziale e riepilogo -->
    <div class="d-flex justify-content-between fw-bold fs-5 border-top pt-3 mt-3">
      <span>Totale parziale </span>
      <span>{{ cartTotal }} €</span>
    </div>

    <!-- Pulsante chiamata all'azione per andare a checkout -->
    <button 
      class="btn btn-primary w-100 fw-bold mt-4 py-2 btn-cta"
      @click="goToCheckout"
    >
      Vai alla cassa
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const FREE_SHIPPING_THRESHOLD = 80;

export default {
  name: "CartDropdown",
  data() {
    return {
      isDropdownVisible: true,
    };
  },
  computed: {
    ...mapGetters({
      cart: "cartItems", // getter per lista articoli carrello
      cartTotal: "cartTotal", // getter per prezzo totale
    }),
    freeShippingThreshold() {
      return FREE_SHIPPING_THRESHOLD;
    },
    freeShippingPercent() {
      // Calcolo percentuale avanzamento verso spedizione gratuita
      return Math.min(
        100,
        (this.cartTotal / FREE_SHIPPING_THRESHOLD) * 100
      );
    },
  },
  methods: {
    incrementQty(item) {
      this.$store.commit("INCREMENT_QTY", item); // Vuex commit per aumentare qty
    },
    decrementQty(item) {
      this.$store.commit("DECREMENT_QTY", item); // Vuex commit per diminuire qty
    },
    removeItem(item) {
      this.$store.commit("REMOVE_CART_ITEM", item); // Vuex commit per rimuovere articolo
    },
    goToCheckout() {
      this.isDropdownVisible = false; // Nasconde dropdown
      this.$nextTick(() => {
        this.$router.push('/checkout'); // Naviga a pagina checkout
      });
    }
  },
};
</script>

<style scoped>
/* Box dropdown carrello con dimensioni e stile */
.cart-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 390px;
  max-width: 95vw;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 28px rgba(41,31,26,0.08);
  padding: 24px;
  z-index: 1050;
  font-family: Arial, sans-serif;
  overflow: visible;
}

/* Media query per adattare il dropdown su mobile e tablet */
@media (max-width: 768px) {
  .cart-dropdown {
    position: fixed !important;
    top: 56px !important; /* altezza navbar */
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 95vw !important;
    max-width: 400px !important;
    z-index: 3000 !important;
    box-sizing: border-box;
    margin: 0 !important;
  }
}

/* Messaggio spedizione con font monospace */
.shipping-message {
  font-family: 'Courier New', monospace;
}

/* Barra progresso personalizzata */
.progress {
  background-color: #ede3d3 !important;
}

/* Colorazione barra di progresso */
.cart-dropdown .progress-bar {
  background-color: #b5cace !important;
}

/* Pulsanti quantità con colori personalizzati */
.btn-qty {
  background-color: #b5cace !important;
  color: #413f3f !important;
  border: none !important;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  border-radius: 4px;
  min-width: 30px;
  height: 30px;
  padding: 0;
  transition: background-color 0.2s ease;
}

.btn-qty:hover {
  background-color: #b89c94 !important;
}

/* Wrapper per area cliccabile quantità */
.qty-clickable {
  cursor: pointer;
  user-select: none;
}

/* Puntatore a mano per elementi cliccabili */
.cursor-pointer {
  cursor: pointer;
}

/* Pulsante rimuovi articolo stile link */
.btn-remove {
  color: #b5cace;
  font-size: 1.5rem;
  line-height: 1;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.btn-remove:hover {
  color: #413f3f;
}

/* Bottone chiamata all'azione per pagamento */
.btn-cta {
  background-color: #b5cace !important;
  color: #413f3f !important;
  border: none !important;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.btn-cta:hover {
  background-color: #b89c94 !important;
}
</style>
