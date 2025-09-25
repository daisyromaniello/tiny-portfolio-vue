<template>
  <div>
    <div class="row gy-4">
      <div v-for="(photo, index) in photos" :key="photo.id" :class="getColClass(index)">
        <div class="gallery-item position-relative" @click="openDetail(photo.id)">
          <img :src="photo.url" :alt="photo.title" class="gallery-image w-100" />
          <div class="gallery-caption d-flex flex-column justify-content-center align-items-center text-center">
            <div class="title">{{ photo.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioGallery',
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
  methods: {
    getColClass(index) {
      return (index % 5) < 3 ? 'col-12 col-sm-6 col-lg-4' : 'col-12 col-sm-6 col-lg-6'
    },
    openDetail(id) {
      this.$emit('openDetail', id)
    }
  }
}
</script>

<style scoped>
.gallery-item {
  position: relative;
  cursor: pointer;
  background: #fff;
  border: 1px solid #b5cace;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  border-radius: 0;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
}
.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.85);
  z-index: 121;
}
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #eee;
  border-radius: 0;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 0;
}
.gallery-item:hover .gallery-image {
  transform: scale(1.1);
}
.gallery-caption {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  text-align: center;
}
.gallery-item:hover .gallery-caption {
  opacity: 1;
}
.gallery-caption .title {
  font-size: 1.1rem;
  font-family: Courier, monospace;
}
</style>
