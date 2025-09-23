<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-custom fixed-top" role="navigation">
    <div class="container">
      <router-link to="/" class="navbar-brand brand">
        A tiny portfolio
      </router-link>

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

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto nav-links">
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/portfolio" @click="closeMenu">Fine art</router-link>
          </li>
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/about" @click="closeMenu">About</router-link>
          </li>
          <li class="nav-item menu-item">
            <router-link class="nav-link" to="/contatti" @click="closeMenu">Contatti</router-link>
          </li>
          <li class="nav-item menu-item position-relative">
            <router-link class="nav-link d-flex align-items-center" to="/cart" @click="closeMenu">
              <font-awesome-icon icon="shopping-cart" class="me-2" />
              <span v-if="cartCount" class="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {{ cartCount }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "MainNavbar",
  computed: {
    ...mapGetters({
      cartItems: 'cartItems',
    }),
    cartCount() {
      return this.cartItems.length
    }
  },
  methods: {
    closeMenu() {
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #b5cace !important;
}

.brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-dark .navbar-toggler-icon {
  /* icona di default Bootstrap */
}

.navbar-nav {
  gap: 30px;
}

.nav-links {
  margin-left: auto;
  align-items: center;
}

.menu-item .nav-link {
  color: white !important;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-item .nav-link:hover {
  transform: scale(1.1);
}

/* per badge e posizionamento */
.position-relative {
  position: relative;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  background-color: transparent !important;
  color: white !important;
  border: 1px solid white;
}
</style>
