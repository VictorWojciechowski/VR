<script setup>
import { ref } from "vue";

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
  document.querySelector("a-scene").emit("enter-scene");
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">

    <!-- Écran titre plein écran -->
    <div class="hero">
      <div class="blood-drips">
        <span v-for="i in 12" :key="i" class="drip" :style="`--i: ${i}`"></span>
      </div>
      <div class="hero-content">
        <img src="/assets/logo.png" alt="Skeleton Wave Shooter Logo" class="logo" />
        <h1 class="title">Skeleton<br/>Wave<br/>Shooter</h1>
        <div class="skull-divider">☠ ☠ ☠</div>
        <p v-if="!loaded" class="loading-text">
          <span class="blink">▮</span> loading...
        </p>
        <button v-if="loaded" @click="enterScene()" class="enter-btn">
          <span class="btn-inner">ENTER IF YOU DARE</span>
        </button>
        <div class="controls-hint" v-if="loaded">
          <span>WASD + Mouse</span>
          <span class="sep">|</span>
          <span>VR Controller Trigger</span>
        </div>
      </div>
      <div class="scroll-hint" v-if="loaded">
        <span>scroll for credits</span>
        <span class="arrow">↓</span>
      </div>
    </div>

    <!-- Section licences en dessous -->
    <div class="credits">
      <div class="credits-inner">
        <h2 class="credits-title">— Credits & Licenses —</h2>

        <div class="credits-section">
          <h3>Source Code</h3>
          <a href="https://github.com/VictorWojciechowski/VR.git" target="_blank">github.com/VictorWojciechowski/VR</a>
        </div>

        <div class="credits-section">
          <h3>Libraries</h3>
          <div class="credits-grid">
            <div class="credit-item">
              <a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras</a>
              <span>MIT License</span>
            </div>
            <div class="credit-item">
              <a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a>
              <span>MIT License</span>
            </div>
            <div class="credit-item">
              <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a>
              <span>MIT License</span>
            </div>
            <div class="credit-item">
              <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a>
              <span>MIT License</span>
            </div>
            <div class="credit-item">
              <a href="https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">simple-navmesh-constraint</a>
              <span>Ada Rose Cannon — MIT License</span>
            </div>
          </div>
        </div>

        <div class="credits-section">
          <h3>3D Models</h3>
          <div class="credits-grid">
            <div class="credit-item">
              <a href="https://sketchfab.com/3d-models/skeleton-animated-9210377c7a514cf6b48a31b9d3991ff3" target="_blank">Skeleton animated</a>
              <span>dnielmclogan — CC BY 4.0</span>
            </div>
            <div class="credit-item">
              <a href="https://sketchfab.com/3d-models/mephiles-phase-1-d506a5f62be046b49bf9ea424333b9f2" target="_blank">Mephiles Phase_1</a>
              <span>World Game — CC BY 4.0</span>
            </div>
            <div class="credit-item">
              <a href="https://sketchfab.com/3d-models/desert-eagle-gun-1605b6c38826433fb3fe564e1d043199" target="_blank">Desert Eagle Gun</a>
              <span>attix84work — CC BY 4.0</span>
            </div>
          </div>
        </div>

        <div class="credits-section">
          <h3>Sounds</h3>
          <div class="credits-grid">
            <div class="credit-item">
              <a href="https://pixabay.com/sound-effects/film-special-effects-single-pistol-gunshot-3-101923/" target="_blank">Single gunshot sound</a>
              <span>morganpurkis — Pixabay Content License</span>
            </div>
            <div class="credit-item">
              <a href="https://www.zapsplat.com/?registration_redirect=1&item_id=166531" target="_blank">Dark rumble atmosphere</a>
              <span>Dark Harmonics — Zapsplat Standard License</span>
            </div>
            <div class="credit-item">
              <a href="https://www.zapsplat.com/sound-effect-category/monsters-and-creatures/" target="_blank">Demon snarl</a>
              <span>Zapsplat — Standard License</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Share+Tech+Mono&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

#onboarding {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #000;
  color: #ccc;
  font-family: 'Share Tech Mono', monospace;
  z-index: 10000;
  scroll-snap-type: y proximity;
}

/* ── HERO ── */
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse at center, #1a0000 0%, #000 70%);
  overflow: hidden;
  scroll-snap-align: start;
}

/* Grain overlay */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 150px;
  opacity: 0.15;
  pointer-events: none;
}

/* Blood drips */
.blood-drips {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.drip {
  position: absolute;
  top: 0;
  left: calc(var(--i) * 8% - 2%);
  width: 3px;
  background: linear-gradient(to bottom, #8b0000, #cc0000, transparent);
  border-radius: 0 0 3px 3px;
  animation: drip calc(3s + var(--i) * 0.4s) ease-in infinite;
  animation-delay: calc(var(--i) * 0.7s);
  opacity: 0.7;
}

@keyframes drip {
  0%   { height: 0; opacity: 0; }
  10%  { opacity: 0.7; }
  60%  { height: calc(40px + var(--i) * 15px); opacity: 0.7; }
  100% { height: calc(40px + var(--i) * 15px); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  animation: fadeIn 1.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.logo {
  width: 120px;
  filter: drop-shadow(0 0 20px #cc0000);
}

.title {
  font-family: 'UnifrakturMaguntia', cursive;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1;
  color: #fff;
  text-shadow:
    0 0 20px #cc0000,
    0 0 60px #660000,
    2px 2px 0 #8b0000;
  letter-spacing: 0.02em;
}

.skull-divider {
  font-size: 1.4rem;
  color: #cc0000;
  letter-spacing: 1rem;
  text-shadow: 0 0 10px #cc0000;
}

.loading-text {
  font-size: 1.1rem;
  color: #666;
  letter-spacing: 0.2em;
}

.blink {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

.enter-btn {
  position: relative;
  background: transparent;
  border: 2px solid #cc0000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.1rem;
  letter-spacing: 0.3em;
  padding: 1rem 2.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s;
}

.enter-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #cc0000;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 0;
}

.enter-btn:hover::before { transform: scaleX(1); }
.enter-btn:hover { color: #fff; box-shadow: 0 0 30px #cc0000; }

.btn-inner {
  position: relative;
  z-index: 1;
}

.controls-hint {
  font-size: 0.75rem;
  color: #555;
  letter-spacing: 0.15em;
  display: flex;
  gap: 0.8rem;
  align-items: center;
}
.sep { color: #cc0000; }

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: #444;
  letter-spacing: 0.15em;
  animation: pulse 2s ease-in-out infinite;
}
.arrow { font-size: 1.2rem; color: #cc0000; }

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
  50%       { opacity: 1;   transform: translateX(-50%) translateY(5px); }
}

/* ── CREDITS ── */
.credits {
  background: #050505;
  border-top: 1px solid #1a0000;
  padding: 5rem 2rem;
}

.credits-inner {
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.credits-title {
  text-align: center;
  font-family: 'UnifrakturMaguntia', cursive;
  font-size: 2rem;
  color: #cc0000;
  text-shadow: 0 0 15px #660000;
  letter-spacing: 0.1em;
}

.credits-section h3 {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #cc0000;
  text-transform: uppercase;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #1a0000;
}

.credits-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.credit-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.85rem;
}

.credit-item a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.2s;
}
.credit-item a:hover { color: #cc0000; }

.credit-item span {
  color: #444;
  font-size: 0.75rem;
  white-space: nowrap;
}

.credits-section > a {
  color: #888;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.credits-section > a:hover { color: #cc0000; }
</style>