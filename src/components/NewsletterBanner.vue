<template>
  <section class="newsletter-banner">
    <div class="container" style="max-width: 1200px;">
      <div class="row align-items-center g-4">
        <div class="col-12 col-md-6 text-section">
          <h2 class="fw-bold mb-3">Vuoi leggere <strong>Tiny stories?</strong></h2>
          <p>Cose belle e un regalo da scartare, suppergiù ogni tanto.</p>
          <h3 class="subtitle mt-4">Iscriviti alla newsletter</h3>
        </div>
        <div class="col-12 col-md-6">
          <form class="form-section p-4" action="http://eepurl.com/drzpsb" method="POST" target="_blank">
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="NAME"
                  placeholder="Nome"
                  autocomplete="given-name"
                  required
                />
              </div>
              <div class="col-12 col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="surname"
                  name="SURNAME"
                  placeholder="Cognome"
                  autocomplete="family-name"
                  required
                />
              </div>
              <div class="col-12">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="EMAIL"
                  placeholder="Email"
                  autocomplete="email"
                  required
                />
              </div>
              <div class="col-12 d-flex justify-content-center">
                <button type="submit" class="btn fw-bold py-2 px-4 submit-button">
                  Certo!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nessuna logica JS aggiuntiva richiesta per ora
</script>

<style scoped>
.newsletter-banner {
  background-color: #e0b3a4; /* colore background del footer */
  color: #413f3f; /* colore testo */
  padding: 30px 20px; /* margini interni */
  text-align: center;
  border-top: 1px solid #b89c94; /* bordo tono su tono */
  border-radius: 0; /* rimossa arrotondatura */
}

.newsletter-banner input[type="text"],
.newsletter-banner input[type="email"] {
  border: 1px solid #b89c94;
  border-radius: 0.25rem;
  padding: 10px 15px;
  font-size: 1rem;
  color: #413f3f;
  background-color: #f9f0ed;
}

.newsletter-banner input::placeholder {
  color: #7a726f;
}

.submit-button {
  background-color: #413f3f;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0.25rem;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #5a5655;
  color: #e0b3a4;
}
</style>
