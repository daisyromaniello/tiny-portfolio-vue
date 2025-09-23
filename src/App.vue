<template>
  <div id="app">
    <MainNavbar />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue';

export default {
  components: { MainNavbar }
};
</script>
