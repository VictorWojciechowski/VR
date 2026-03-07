<script setup>
import { ref } from "vue";

const emit = defineEmits(['start']);
const skeletonCount = ref(15);
</script>

<template>
  <div class="menu-overlay">
    <div class="menu-box">
      <h1>☠️ SKELETON SHOOTER</h1>
      <div class="slider-section">
        <label>Nombre de squelettes : <strong>{{ skeletonCount }}</strong></label>
        <input
          type="range"
          min="1"
          max="35"
          v-model="skeletonCount"
        />
      </div>
      <button @click="emit('start', Number(skeletonCount))">Commencer</button>
    </div>
  </div>
</template>

<style scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: sans-serif;
  color: white;
  text-align: center;
}
.menu-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.menu-box h1 {
  font-size: 3rem;
  letter-spacing: 0.2em;
  color: #ff3333;
}
.slider-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
}
.slider-section input {
  width: 300px;
  accent-color: #ff3333;
}
.menu-box button {
  padding: 0.8rem 2.5rem;
  font-size: 1.2rem;
  background: #ff3333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.menu-box button:hover {
  background: #cc0000;
}
</style>