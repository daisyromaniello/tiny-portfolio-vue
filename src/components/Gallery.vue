<template>
  <div>
    <div class="row g-3">
      <div v-for="photo in visiblePhotos" :key="photo.id" class="col-6 col-sm-4 col-lg-3">
        <div class="card h-100" style="cursor:pointer" @click="$emit('openDetail', photo.id)">
          <img :src="photo.url" class="card-img-top gallery-img" :alt="photo.title">
          <div class="card-body p-2">
            <h6 class="card-title mb-1">{{ photo.title }}</h6>
            <p class="small text-muted mb-0">{{ photo.tags.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-3">
      <button class="big-button" @click="toggleMore">{{ showAll ? 'Mostra meno' : 'Scopri di più' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioGallery',
  props: { photos: { type: Array, default: () => [] } },
  data() { return { showAll: false } },
  computed: {
    visiblePhotos() {
      return this.showAll ? this.photos : this.photos.slice(0, 3)
    }
  },
  methods: {
    toggleMore() { this.showAll = !this.showAll }
  }
}
</script>
