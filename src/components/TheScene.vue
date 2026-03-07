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
  const scene = document.querySelector('a-scene');

  if (assets) {
    assets.addEventListener('loaded', () => {
      allAssetsLoaded.value = true;
      emit('loaded');
    });
  }

  if (scene) {
    // Lance la musique quand le joueur clique sur "Enter scene"
    // À ce moment il y a eu une interaction utilisateur donc le navigateur autorise l'audio
    scene.addEventListener('enter-scene', () => {
      const music = document.querySelector('#backgroundMusic');
      if (music) {
        music.loop = true;
        music.volume = 0.4;
        music.play();
      }
    });

    scene.addEventListener('game-ended', () => {
      const music = document.querySelector('#backgroundMusic');
      if (music) {
        music.pause();
        music.currentTime = 0;
      }
    });

    scene.addEventListener('game-restart', () => {
      const music = document.querySelector('#backgroundMusic');
      if (music) {
        music.play();
      }
    });
  }
});
</script>

<template>
  <a-scene
    background="color: #0a0a0a"
    fog="type: linear; color: #A14C3B; near: 10; far: 40"
    abloom
    game-manager
    light="defaultLightsEnabled: false"
  >
    <a-assets>
      <a-asset-item id="playground" src="assets/mephiles_phase_1.glb"></a-asset-item>
      <a-asset-item id="gun" src="assets/desert_eagle_gun.glb"></a-asset-item>
      <a-asset-item id="skeleton" src="assets/skeleton_animated.glb"></a-asset-item>
      <a-asset-item id="bulletModel" src="assets/bullet.glb"></a-asset-item>
      <audio id="gunshot" src="assets/gunshot.mp3" preload="auto"></audio>
      <audio id="backgroundMusic" src="assets/background_music.mp3" preload="auto"></audio>
      <audio id="snarl" src="assets/snarl.mp3" preload="auto"></audio>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-light type="ambient" color="#111111" intensity="1"></a-light>
      <a-light type="directional" color="#FF3100" intensity="1" position="-1 1 0"></a-light>
      <a-light type="hemisphere" color="#883322" ground-color="#FFBBA8" intensity="1"></a-light>

      <ThePlayground></ThePlayground>
      <a-entity data-role="nav-mesh"></a-entity>
    </template>

    <TheCameraRig :allAssetsLoaded="allAssetsLoaded" />
  </a-scene>
</template>