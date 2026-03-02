<script setup>
import "../aframe/show-in-vr.js";
import "../aframe/hide-in-vr.js"; 
</script>

<template>
  <a-entity>
    <!-- Desktop -->
    <a-entity
      id="gun-desktop"
      gltf-model="#gun"
      scale="0.0025 0.0025 0.0025"
      rotation="0 180 0"
      hide-in-vr
    >
      <!-- 🔥 Muzzle desktop (ajuste la position) -->
      <a-entity id="muzzle-desktop" position="0 0 0.25"></a-entity>
    </a-entity>

    <!-- VR -->
    <a-entity
      id="gun-vr"
      gltf-model="#gun"
      scale="0.0025 0.0025 0.0025"
      show-in-vr
    >
      <!-- 🔥 Muzzle VR (ajuste la position) -->
      <a-entity id="muzzle-vr" position="0 0 0.25"></a-entity>
    </a-entity>
  </a-entity>
</template>