<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheSkeleton from "./TheSkeleton.vue";

const props = defineProps({
  skeletonCount: { type: Number, default: 15 },
  gameStarted: { type: Boolean, default: false }
});

function randomPos(min, max) {
  return Math.random() * (max - min) + min;
}

function generatePositions() {
  return Array.from({ length: props.skeletonCount }, () => {
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
  // Met à jour le game-manager avec le nouveau count
  const scene = document.querySelector('a-scene');
  if (scene) scene.emit('skeleton-count', { count: props.skeletonCount });
}

onMounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    // Informe le game-manager du nombre de squelettes
    scene.emit('skeleton-count', { count: props.skeletonCount });
    scene.addEventListener('game-restart', onRestart);
  }
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
      v-if="gameStarted"
      v-for="(pos, index) in skeletonPositions"
      :key="`${index}-${pos.x}`"
      :position="`${pos.x} ${pos.y} ${pos.z}`"
      :speed="pos.speed"
    />
  </a-entity>
</template>