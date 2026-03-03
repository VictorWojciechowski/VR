<script setup>

import "../aframe/skeleton-walker.js";
import "../aframe/shooting-target.js";
import { onMounted, ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/bloom.js";
import "../aframe/duplicate.js";
import "../aframe/look-at.js";
import ThePlayground from "./ThePlayground.vue";



function handleCol() {
  console.log("collision detected !");
}

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: #a3d0ed"
    fog="type: linear; color: #abd0ed; near: 30; far: 100"
    abloom
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="playground"
        src="assets/mephiles_phase_1.glb"
      ></a-asset-item>
      <a-asset-item id="gun" src="assets/desert_eagle_gun.glb"></a-asset-item>
      <a-asset-item id="skeleton" src="assets/skeleton_animated.glb"></a-asset-item>
      <a-asset-item id="bulletModel" src="assets/bullet.glb"></a-asset-item>
      <audio id="gunshot" src="assets/gunshot.mp3" preload="auto"></audio>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <ThePlayground></ThePlayground>
      <a-entity data-role="nav-mesh"> </a-entity>
    </template>

    <TheCameraRig :allAssetsLoaded="allAssetsLoaded" />
  </a-scene>
</template>
