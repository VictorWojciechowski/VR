<script setup>
import "../aframe/shooting-target.js";
import "../aframe/skeleton-walker.js";

const props = defineProps({
  position: { type: String, default: "0 0.677 0" },
  speed: { type: Number, default: 0.5 }
});
</script>

<!-- :skeleton-walker="`speed: ${props.speed}`" -->

<template>
  <a-entity
    :position="props.position"
    
    
    shooting-target
  >
    <a-entity
    clickable
    class="shootable"
      gltf-model="#skeleton"
      scale="1.2 1.2 1.2"
    ></a-entity>
  </a-entity>
</template>