<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/show-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/physx-grab.js";
import TheGun from "./TheGun.vue";
import { ref, onMounted } from "vue";

const props = defineProps({ allAssetsLoaded: Boolean });
const gameOver = ref(false);
const isVR = ref(false);

function replay() {
  gameOver.value = false;
  const scene = document.querySelector('a-scene');
  if (scene) scene.emit('game-restart');
}

onMounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('enter-vr', () => isVR.value = true);
    scene.addEventListener('exit-vr', () => isVR.value = false);
    scene.addEventListener('game-over', () => {
      gameOver.value = true;
      setTimeout(() => {
        const btn = document.querySelector('#replay-btn');
        if (btn) btn.addEventListener('click', replay);
      }, 300);
    });
  }
});
</script>

<template>
  <!-- Overlay HTML desktop uniquement -->
  <Teleport to="body">
    <div v-if="gameOver && !isVR" class="game-over-overlay">
      <div class="game-over-box">
        <h1>GAME OVER</h1>
        <button @click="replay">Rejouer</button>
      </div>
    </div>
  </Teleport>

  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <a-entity
      id="head"
      camera
      position="0 1.65 0"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
    >
      <!-- Panneau Game Over VR uniquement -->
      <a-entity v-if="gameOver && isVR" position="0 0 -1.5">
        <a-plane width="1.5" height="0.8" color="#1a1a2e" opacity="0.95"></a-plane>
        <a-text
          value="GAME OVER"
          align="center" color="#ff3333"
          scale="1.2 1.2 1.2"
          position="0 0.2 0.01"
        ></a-text>
        <a-plane
          id="replay-btn"
          width="0.6" height="0.15"
          color="#ff3333"
          position="0 -0.15 0.01"
          clickable
        ></a-plane>
        <a-text
          value="REJOUER"
          align="center" color="white"
          scale="0.5 0.5 0.5"
          position="0 -0.15 0.02"
        ></a-text>
      </a-entity>

      <!-- Curseur desktop uniquement -->
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 50; objects: [clickable]; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <!-- Pistolet desktop -->
      <a-entity id="dummy-hand-right" obb-collider position="0.3 -0.4 -1.1" hide-in-vr>
        <TheGun v-if="allAssetsLoaded"></TheGun>
      </a-entity>
    </a-entity>

    <!-- Manette droite VR -->
    <a-entity id="hand-right" tracked-controls="hand: right" obb-collider>
      <TheGun v-if="allAssetsLoaded"></TheGun>
    </a-entity>
  </a-entity>
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
  font-family: sans-serif;
  color: white;
  text-align: center;
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
.game-over-box button:hover {
  background: #cc0000;
}
</style>