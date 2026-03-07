<script setup>
import "../aframe/skeleton-walker.js";
import "../aframe/shooting-target.js";
import "../aframe/clickable.js";
import "../aframe/bloom.js";
import "../aframe/duplicate.js";
import "../aframe/look-at.js";
import "../aframe/game-manager.js";
import { ref, onMounted } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import ThePlayground from "./ThePlayground.vue";

const emit = defineEmits(["loaded"]);
const allAssetsLoaded = ref(false);

onMounted(() => {
  const assets = document.querySelector('a-assets');
  if (assets) {
    assets.addEventListener('loaded', () => {
      allAssetsLoaded.value = true;
      emit('loaded');
    });
  }
});
</script>

<template>
  <a-scene
    background="color: #a3d0ed"
    fog="type: linear; color: #abd0ed; near: 30; far: 100"
    abloom
    game-manager
  >
    <a-assets>
      <a-asset-item id="playground" src="assets/mephiles_phase_1.glb"></a-asset-item>
      <a-asset-item id="gun" src="assets/desert_eagle_gun.glb"></a-asset-item>
      <a-asset-item id="skeleton" src="assets/skeleton_animated.glb"></a-asset-item>
      <a-asset-item id="bulletModel" src="assets/bullet.glb"></a-asset-item>
      <audio id="gunshot" src="assets/gunshot.mp3" preload="auto"></audio>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <ThePlayground></ThePlayground>
      <a-entity data-role="nav-mesh"></a-entity>
    </template>

    <TheCameraRig :allAssetsLoaded="allAssetsLoaded" />
  </a-scene>
</template>