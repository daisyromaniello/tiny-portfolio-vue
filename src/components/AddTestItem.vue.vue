<template>
  <footer class="bg-footer text-footer py-4">
    <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <!-- <p class="mb-3 mb-sm-0">Mi trovi qui:</p> -->
      <div class="social-icons d-flex">
        <a href="https://www.instagram.com/daisyromaniello/?hl=it" target="_blank" rel="noopener" aria-label="Instagram">
          <img src="/images/instagram-icon.png" alt="Instagram" class="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/daisyromaniello/" target="_blank" rel="noopener" aria-label="LinkedIn" class="ms-3">
          <img src="/images/linkedin-icon.png" alt="LinkedIn" class="social-icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'  
};
</script>

<style scoped>
.bg-footer {
  background-color: #413f3f;
  color: #e0b3a4;
}

.social-icons a {
  display: inline-block;
  transition: filter 0.3s ease;
}

.social-icon {
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1); /* icone bianche */
  transition: filter 0.3s ease;
}

.social-icon:hover {
  filter: brightness(0) saturate(100%) invert(69%) sepia(32%) saturate(370%) hue-rotate(327deg) brightness(101%) contrast(87%);
  /* filtro CSS per rosa #e0b3a4 */
}
</style>
