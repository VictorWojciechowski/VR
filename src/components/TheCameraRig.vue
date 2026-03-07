<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/show-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/physx-grab.js";
import TheGun from "./TheGun.vue";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({ allAssetsLoaded: Boolean });
const gameOver = ref(false);
const victory = ref(false);
const isVR = ref(false);
const score = ref(0);
const timer = ref('00:00');
const highscores = ref([]);

function replay() {
  gameOver.value = false;
  victory.value = false;
  const scene = document.querySelector('a-scene');
  if (scene) scene.emit('game-restart');
}

function onHudUpdate(e) {
  score.value = e.detail.score;
  timer.value = formatTime(e.detail.timer);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function onGameEnded(e) {
  score.value = e.detail.score;
  timer.value = e.detail.time;
  highscores.value = e.detail.highscores;
  if (e.detail.victory) {
    victory.value = true;
  } else {
    gameOver.value = true;
  }
  setTimeout(() => {
    const btn = document.querySelector('#replay-btn');
    if (btn) btn.addEventListener('click', replay);
  }, 300);
}

onMounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('enter-vr', () => isVR.value = true);
    scene.addEventListener('exit-vr', () => isVR.value = false);
    scene.addEventListener('hud-update', onHudUpdate);
    scene.addEventListener('game-ended', onGameEnded);
  }
});

onUnmounted(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.removeEventListener('hud-update', onHudUpdate);
    scene.removeEventListener('game-ended', onGameEnded);
  }
});
</script>

<template>
  <Teleport to="body">
    <!-- HUD en jeu -->
    <div v-if="!gameOver && !victory" class="hud">
      <div class="hud-score">{{ score }} pts</div>
      <div class="hud-timer">⏱ {{ timer }}</div>
    </div>

    <!-- Overlay victoire desktop -->
    <div v-if="victory && !isVR" class="game-over-overlay">
      <div class="game-over-box">
        <h1 style="color: #33ff99">VICTOIRE !</h1>
        <p>Tous les squelettes sont éliminés</p>
        <p>Temps : {{ timer }}</p>
        <p>Score : {{ score }} pts</p>
        <div class="highscores">
          <h2>🏆 Meilleurs scores</h2>
          <ol>
            <li v-for="(entry, i) in highscores" :key="i">
              {{ entry.score }} pts — {{ entry.time }} — {{ entry.date }}
            </li>
          </ol>
          <p v-if="highscores.length === 0">Aucun score enregistré</p>
        </div>
        <button @click="replay">Rejouer</button>
      </div>
    </div>

    <!-- Overlay game over desktop -->
    <div v-if="gameOver && !isVR" class="game-over-overlay">
      <div class="game-over-box">
        <h1>GAME OVER</h1>
        <p>Temps survécu : {{ timer }}</p>
        <p>Score final : {{ score }} pts</p>
        <div class="highscores">
          <h2>🏆 Meilleurs scores</h2>
          <ol>
            <li v-for="(entry, i) in highscores" :key="i">
              {{ entry.score }} pts — {{ entry.time }} — {{ entry.date }}
            </li>
          </ol>
          <p v-if="highscores.length === 0">Aucun score enregistré</p>
        </div>
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
      <!-- Panneau Game Over / Victoire VR -->
      <a-entity v-if="(gameOver || victory) && isVR" position="0 0 -1.5">
        <a-plane width="1.5" height="1" color="#1a1a2e" opacity="0.95"></a-plane>
        <a-text
          :value="victory ? 'VICTOIRE !' : 'GAME OVER'"
          align="center"
          :color="victory ? '#33ff99' : '#ff3333'"
          scale="1.2 1.2 1.2"
          position="0 0.35 0.01"
        ></a-text>
        <a-text
          :value="`Temps : ${timer}`"
          align="center" color="white"
          scale="0.6 0.6 0.6"
          position="0 0.1 0.01"
        ></a-text>
        <a-text
          :value="`Score : ${score} pts`"
          align="center" color="white"
          scale="0.6 0.6 0.6"
          position="0 -0.05 0.01"
        ></a-text>
        <a-plane
          id="replay-btn"
          width="0.6" height="0.15"
          color="#ff3333"
          position="0 -0.3 0.01"
          clickable
        ></a-plane>
        <a-text
          value="REJOUER"
          align="center" color="white"
          scale="0.5 0.5 0.5"
          position="0 -0.3 0.02"
        ></a-text>
      </a-entity>

      <!-- Curseur desktop -->
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
.hud {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 9999;
  pointer-events: none;
  font-family: sans-serif;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.hud-score, .hud-timer {
  font-size: 1.8rem;
}
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
  margin-bottom: 1rem;
  letter-spacing: 0.2em;
}
.game-over-box p {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}
.game-over-box button {
  margin-top: 1.5rem;
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
.highscores {
  margin-top: 1.5rem;
  text-align: left;
}
.highscores h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.highscores ol {
  padding-left: 1.5rem;
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.8;
}
</style>