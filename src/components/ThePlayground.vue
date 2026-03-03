<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheSkeleton from "./TheSkeleton.vue";

function randomPos(min, max) {
  return Math.random() * (max - min) + min;
}

function generatePositions() {
  return Array.from({ length: 15 }, () => {
    let x = randomPos(-15, 15);
    let z = randomPos(-15, -5);
    while (Math.sqrt(x * x + z * z) < 4) {
      x = randomPos(-15, 15);
      z = randomPos(-15, -5);
    }
    return { x, y: 0.677, z, speed: randomPos(0.5, 0.8) };
  });
}

const skeletonPositions = ref(generatePositions());

function onRestart() {
  skeletonPositions.value = generatePositions();
}

onMounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) scene.addEventListener('game-restart', onRestart);
});

onUnmounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) scene.removeEventListener('game-restart', onRestart);
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
      :key="`${index}-${pos.x}`"
      :position="`${pos.x} ${pos.y} ${pos.z}`"
      :speed="pos.speed"
    />
  </a-entity>
</template>