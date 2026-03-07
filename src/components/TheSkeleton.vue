<script setup>
import "../aframe/shooting-target.js";
import "../aframe/skeleton-walker.js";

const props = defineProps({
  position: { type: String, default: "0 0.677 0" },
  speed: { type: Number, default: 0.5 },
});
</script>

<template>
  <a-entity
    :position="props.position"
    :skeleton-walker="`speed: ${props.speed}`"
    shooting-target
  >
    <!-- Hitbox invisible plus grande que le squelette -->
    <a-box
      width="1"
      height="1.8"
      depth="0.8"
      position="0 0.9 0"
      material="transparent: true; opacity: 0"
      clickable
    ></a-box>

    <!-- Modèle squelette -->
    <a-entity
      gltf-model="#skeleton"
      scale="1.2 1.2 1.2"
    ></a-entity>
  </a-entity>
</template>
