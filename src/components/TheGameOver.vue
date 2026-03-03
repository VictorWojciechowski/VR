<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
const isVR = ref(false);

function onGameOver() {
  visible.value = true;
}

function onEnterVR() { isVR.value = true; }
function onExitVR() { isVR.value = false; }

function replay() {
  gameOver.value = false;
  const scene = document.querySelector('a-scene');
  if (scene) scene.emit('game-restart');
}

onMounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('game-over', onGameOver);
    scene.addEventListener('enter-vr', onEnterVR);
    scene.addEventListener('exit-vr', onExitVR);
  }
});

onUnmounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.removeEventListener('game-over', onGameOver);
    scene.removeEventListener('enter-vr', onEnterVR);
    scene.removeEventListener('exit-vr', onExitVR);
  }
});
</script>

<template>
  <!-- Desktop uniquement -->
  <div v-if="visible && !isVR" class="game-over-overlay">
    <div class="game-over-box">
      <h1>GAME OVER</h1>
      <button @click="replay">Rejouer</button>
    </div>
  </div>
</template>

<style scoped>
.game-over-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.game-over-box {
  text-align: center;
  color: white;
  font-family: sans-serif;
}
.game-over-box h1 {
  font-size: 4rem;
  color: #ff3333;
  margin-bottom: 1rem;
  letter-spacing: 0.2em;
}
.game-over-box p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}
.game-over-box button {
  padding: 0.8rem 2.5rem;
  font-size: 1.2rem;
  background: #ff3333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.game-over-box button:hover { background: #cc0000; }
</style>