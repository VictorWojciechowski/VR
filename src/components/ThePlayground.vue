<script setup>
import TheSkeleton from "./TheSkeleton.vue";

function randomPos(min, max) {
  return Math.random() * (max - min) + min;
}

const skeletonCount = 15;
const skeletonPositions = Array.from({ length: skeletonCount }, () => {
  let x = randomPos(-15, 15);
  let z = randomPos(-15, -5);

  while (Math.sqrt(x * x + z * z) < 4) {
    // Regenerate position if it's too close to the origin
    x = randomPos(-15, 15);
    z = randomPos(-15, -5);
  }
  return { 
    x,
    y: 0.677,
    z, 
    speed: randomPos(0.5, 2),
  }
});
</script>
<template>
  <a-entity>
    <a-entity
      position="0 0 0"
      gltf-model="#playground"
      scale="0.005 0.005 0.005"
    ></a-entity>

    <TheSkeleton
      v-for="(pos, index) in skeletonPositions"
      :key="index"
      :position="`${pos.x} ${pos.y} ${pos.z}`"
      :speed="pos.speed"
    />
  </a-entity>
</template>
