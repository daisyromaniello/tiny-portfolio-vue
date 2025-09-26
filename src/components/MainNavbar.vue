<template>
  <!-- Navbar fissa in alto con sfondo personalizzato e testo chiaro -->
  <nav class="navbar navbar-expand-md navbar-dark bg-custom fixed-top" role="navigation">
    <div class="container">

      <!-- Brand con router-link alla homepage -->
      <router-link to="/" class="navbar-brand brand">
        A tiny portfolio
      </router-link>

      <!-- Bottone toggler per menu a collapsible su schermi piccoli -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu di navigazione, collassabile -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto nav-links">
          <!-- Singolo item menu con router-link e chiusura menu al click -->
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/portfolio" @click="closeMenu">Fine art</router-link>
          </li>
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/about" @click="closeMenu">About</router-link>
          </li>
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/contatti" @click="closeMenu">Contatti</router-link>
          </li>

          <!-- Icona carrello con badge quantità e dropdown carrello -->
          <li
            class="nav-item menu-item position-relative"
            ref="cartWrapper"
          >
            <div
              class="nav-link d-flex align-items-center"
              aria-label="Carrello"
              style="cursor: pointer;"
              @click.prevent="toggleCart"
              tabindex="0"
              @keydown.enter.prevent="toggleCart"
            >
              <font-awesome-icon icon="shopping-cart" class="me-2" />
              <!-- Badge quantità articoli nel carrello -->
              <span
                v-if="cartCount"
                class="badge bg-danger position-absolute top-0 start-100 translate-middle"
              >
                {{ cartCount }}
              </span>
            </div>

            <!-- Dropdown carrello, visibile se showCart è true -->
            <CartDropdown v-if="showCart" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import CartDropdown from "@/components/CartDropdown.vue";

// Assumendo che bootstrap.bundle.min.js sia importato globalmente o qui
export default {
  name: "MainNavbar",
  components: { CartDropdown },
  data() {
    return {
      showCart: false, // Stato visibilità dropdown carrello
    };
  },
  computed: {
    ...mapGetters({
      cartCount: "cartTotalQuantity" // Numero totale articoli in carrello da Vuex
    }),
  },
  mounted() {
    // Listener click globale per gestire click fuori dropdown carrello
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    // Chiude menu collapsible bootstrap dopo selezione
    closeMenu() {
      const navbarCollapse = document.getElementById("navbarSupportedContent");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = window.bootstrap?.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove("show");
        }
      }
    },
    // Toggle visibilità dropdown carrello
    toggleCart() {
      this.showCart = !this.showCart;
    },
    // Gestisce click fuori dropdown per chiuderlo
    handleClickOutside(e) {
      const cartWrapper = this.$refs.cartWrapper;
      if (cartWrapper && !cartWrapper.contains(e.target)) {
        this.showCart = false;
      }
    },
  },
};
</script>

<style scoped>
/* Colore sfondo personalizzato navbar */
.bg-custom {
  background-color: #b5cace !important;
}

/* Stile brand navbar */
.brand {
  font-weight: bold;
  font-size: 1.5rem;
}

/* Spaziatura per nav-link a destra */
.nav-links {
  margin-left: auto;
  align-items: center;
}

/* Flex verticale nei breakpoint piccoli per nav links */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column !important;
    width: 100%;
  }
}

/* Stile link menu */
.menu-item .nav-link {
  color: white !important;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* Effetto hover ingrandimento */
.menu-item .nav-link:hover {
  transform: scale(1.1);
}

/* Posizionamento relativo per badge carrello */
.position-relative {
  position: relative;
}

/* Badge quantità carrello con bordo bianco */
.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  background-color: transparent !important;
  color: white !important;
  border: 1px solid white;
}


</style>
