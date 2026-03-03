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
    <a-entity
      clickable
      gltf-model="#skeleton"
      scale="1.2 1.2 1.2"
    ></a-entity>
  </a-entity>
  
</template>
