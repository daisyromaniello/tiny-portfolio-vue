<template>
  <footer class="bg-footer text-footer py-4">
    <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <!-- Contenitore icone social in riga o colonna a seconda della larghezza -->
      <div class="social-icons d-flex">
        <!-- Link a Instagram con aria-label per accessibilità -->
        <a href="https://www.instagram.com/daisyromaniello/?hl=it" target="_blank" rel="noopener" aria-label="Instagram">
          <img src="/images/instagram-icon.png" alt="Instagram" class="social-icon" />
        </a>
        <!-- Link a LinkedIn con margine sinistro per distanza -->
        <a href="https://www.linkedin.com/in/daisyromaniello/" target="_blank" rel="noopener" aria-label="LinkedIn" class="ms-3">
          <img src="/images/linkedin-icon.png" alt="LinkedIn" class="social-icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'  // Nome componente footer semplice
};
</script>

<style scoped>
/* Sfondo e colore testo coordinati col design */
.bg-footer {
  background-color: #413f3f;
  color: #e0b3a4;
}

/* Link icone social come inline-block per dimensioni e transizione */
.social-icons a {
  display: inline-block;
  transition: filter 0.3s ease;
}

/* Icone social dimensionate e colorate bianche con filtro CSS */
.social-icon {
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1); /* icone bianche */
  transition: filter 0.3s ease;
}

/* Hover filtro colorato rosa #e0b3a4 per interattività */
.social-icon:hover {
  filter: brightness(0) saturate(100%) invert(69%) sepia(32%) saturate(370%) hue-rotate(327deg) brightness(101%) contrast(87%);
}
</style>
