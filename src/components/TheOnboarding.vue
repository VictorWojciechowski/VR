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
    <div>
      <img src="/assets/logo.png" alt="Skeleton Wave Shooter Logo" width="200" />
      <h2>Skeleton Wave Shooter</h2>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Enter scene</button>
      <div class="licences">
        <section>
          <h4>Movement modes support</h4>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              control (Drag and drop)
            </li>
            <li>
              VR/AR – Use headset for viewing and controllers for shooting (controller trigger for pistol shooting)
            </li>
          </ul>
        </section>
        <section>
          <h4>Source code</h4>
          <blockquote>
            <a href="https://github.com/VictorWojciechowski/VR.git"
              >Github repo</a
            >
          </blockquote>
        </section>
        <dl>
          <dt>
            <i>Included</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank"
              >aframe-extras</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank"
              >aframe physx</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href="https://github.com/jure/aframe-blink-controls/"
              target="_blank"
              >aframe-blink-controls</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href="https://github.com/diarmidmackenzie/aframe-multi-camera/"
              target="_blank"
              >aframe-multi-camera</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
              target="_blank"
              >simple-navmesh-constraint</a
            >
          </dt>
          <dd>By Ada Rose Cannon under MIT License</dd>

          <dt>Skeleton animated</dt>
          <dd>
            by
            <a
              href="https://sketchfab.com/3d-models/skeleton-animated-9210377c7a514cf6b48a31b9d3991ff3"
              target="_blank"
              >dnielmclogan</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a
              href="https://pixabay.com/sound-effects/film-special-effects-single-pistol-gunshot-3-101923/"
              target="_blank"
              >Single gunshot sound</a
            >
          </dt>
          <dd>
            by
            <a
              href="https://pixabay.com/users/freesound_community-46691455/"
              target="_blank"
              >morganpurkis for freesound community</a
            >
            under
            <a
              href="https://pixabay.com/service/license-summary/"
              target="_blank"
              >Pixabay Content License</a
            >
          </dd>
          <dt>
            <a
              href="https://sketchfab.com/3d-models/mephiles-phase-1-d506a5f62be046b49bf9ea424333b9f2"
              target="_blank"
              >Mephiles Phase_1</a
            >
          </dt>
          <dd>
            by
            <a
              href="https://pixabay.com/users/freesound_community-46691455/"
              target="_blank"
              >World Game</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>
          <dt>
            <a
              href="https://sketchfab.com/3d-models/desert-eagle-gun-1605b6c38826433fb3fe564e1d043199"
              target="_blank"
              >Desert Eagle Gun</a
            >
          </dt>
          <dd>
            by
            <a href="https://sketchfab.com/attix84work" target="_blank"
              >attix84work</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>
          <dt>
            <a
              href="https://www.zapsplat.com/?registration_redirect=1&item_id=166531"
              target="_blank"
              >Dark rumble atmosphere, loops, droning, slight low pitched
              whine</a
            >
          </dt>
          <dd>
            by
            <a
              href="https://www.zapsplat.com/author/dark-harmonics/?_gl=1*m6fwel*_up*MQ..*_ga*NTk1NTYyNDMyLjE3NzI5MDAzMzU.*_ga_901GQX73MS*czE3NzI5MDAzMzUkbzEkZzAkdDE3NzI5MDAzMzUkajYwJGwwJGgw"
              target="_blank"
              >Dark Harmonics</a
            >
            under
            <a
              href="https://www.zapsplat.com/license-type/standard-license/?_gl=1*zin4wm*_up*MQ..*_ga*MjA0MjI2MTAwNC4xNzcyOTAwMjMw*_ga_901GQX73MS*czE3NzI5MDAyMzAkbzEkZzAkdDE3NzI5MDAyMzAkajYwJGwwJGgw"
              target="_blank"
              >Standard License Agreement</a
            >
          </dd>
          <dt>
            <a
              href="https://www.zapsplat.com/sound-effect-category/monsters-and-creatures/?_gl=1*1kpfrtr*_up*MQ..*_ga*MTYzNjgzMzM2LjE3NzI5MDAzODE.*_ga_901GQX73MS*czE3NzI5MDAzODEkbzEkZzEkdDE3NzI5MDA4MjAkajYwJGwwJGgw"
              target="_blank"
              >Demon or evil monster, snarl, nasal, soft</a
            >
          </dt>
          <dd>
            by
            <a
              href="https://www.zapsplat.com/author/zapsplat/?_gl=1*1jixcar*_up*MQ..*_ga*MTc3MDU3NDE3MS4xNzcyOTAxMDA0*_ga_901GQX73MS*czE3NzI5MDEwMDMkbzEkZzAkdDE3NzI5MDEwMDMkajYwJGwwJGgw"
              target="_blank"
              >Zapslat</a
            >
            under
            <a
              href="https://www.zapsplat.com/license-type/standard-license/?_gl=1*zin4wm*_up*MQ..*_ga*MjA0MjI2MTAwNC4xNzcyOTAwMjMw*_ga_901GQX73MS*czE3NzI5MDAyMzAkbzEkZzAkdDE3NzI5MDAyMzAkajYwJGwwJGgw"
              target="_blank"
              >Standard License Agreement</a
            >
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 5rem;
}
a {
  color: #eee;
  text-decoration: none;
}
.licences {
  margin: 2rem 0;
  padding-bottom: 1rem;
  font-size: 1rem;
  text-align: left;
}
.licences dt {
  padding-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.licences dd {
  margin-left: 0;
  font-size: 0.8rem;
}

#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #333;
  color: #ccc;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  font-family: monospace;
  z-index: 10000;
  overflow: auto;
}
#onboarding > * {
  margin: 0 auto;
  max-width: 50rem;
  width: calc(100vw - 10rem);
  text-align: center;
  border-radius: 0.3rem;
  padding: 1rem;
  font-size: 1.3rem;
}
#onboarding button {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
