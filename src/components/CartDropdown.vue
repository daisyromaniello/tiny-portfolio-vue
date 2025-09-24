<template>
  <div class="cart-dropdown shadow rounded bg-white p-4" role="dialog" aria-modal="true">
    <div class="shipping-message mb-3 fw-semibold text-secondary" style="letter-spacing: 0.03em;">
      Spedizione gratuita per ordini sopra <strong class="text-dark">{{ freeShippingThreshold }}€</strong>
    </div>

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

    <div
      v-for="item in cart"
      :key="item.id + item.format + item.paper + item.customization"
      class="d-flex align-items-center mb-3"
    >
      <div class="flex-grow-1">
        <div class="fw-bold mb-1">{{ item.title }}</div>
        <div class="text-muted small">{{ item.format }} cm</div>
        <div class="text-dark fw-semibold">{{ item.price }} €</div>
      </div>

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

      <button
        class="btn btn-link p-0 btn-remove"
        @click.stop.prevent="removeItem(item)"
        aria-label="Rimuovi articolo"
      >
        &times;
      </button>
    </div>

    <div class="d-flex justify-content-between fw-bold fs-5 border-top pt-3 mt-3">
      <span>Totale parziale </span>
      <span>{{ cartTotal }} €</span>
    </div>

    <button 
      class="btn btn-primary w-100 fw-bold mt-4 py-2 btn-cta"
      @click="$router.push('/checkout')"
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
  computed: {
    ...mapGetters({
      cart: "cartItems",
      cartTotal: "cartTotal",
    }),
    freeShippingThreshold() {
      return FREE_SHIPPING_THRESHOLD;
    },
    freeShippingPercent() {
      return Math.min(
        100,
        (this.cartTotal / FREE_SHIPPING_THRESHOLD) * 100
      );
    },
  },
  methods: {
    incrementQty(item) {
      this.$store.commit("INCREMENT_QTY", item);
    },
    decrementQty(item) {
      this.$store.commit("DECREMENT_QTY", item);
    },
    removeItem(item) {
      this.$store.commit("REMOVE_CART_ITEM", item);
    },
  },
};
</script>

<style scoped>
.cart-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  left: auto;
  transform: none;
  width: 390px;
  max-width: 95vw;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 28px rgba(41,31,26,0.08);
  padding: 24px;
  z-index: 1050;
  font-family: Arial, sans-serif;
  overflow: visible; /* assicura che nulla venga tagliato */
}

@media (max-width: 480px) {
  .cart-dropdown {
    position: fixed !important;
    top: 56px !important; /* altezza navbar, regola se serve */
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    width: 95vw !important;
    max-width: 95vw !important;
    margin: 0 !important;
    overflow: visible !important;
  }
}

.shipping-message {
  font-family: 'Courier New', monospace;
}

.progress {
  background-color: #ede3d3 !important;
}

.cart-dropdown .progress-bar {
  background-color: #b5cace !important;
}

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
  background-color: #b89c94 !important; /* colore hover personalizzato */
}

.qty-clickable {
  cursor: pointer;
  user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}

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
  background-color: #b89c94 !important; /* colore hover personalizzato */
}
</style>
