<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/show-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/gun-fx.js";

import TheGun from "./TheGun.vue";

defineProps({ allAssetsLoaded: Boolean });
</script>

<template>
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
      <!-- Desktop cursor + tir desktop -->
      <a-entity
        id="headCursor"
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 50; objects: .clickable; showLine: true; lineColor: red; lineOpacity: 4;"
        gun-fx="
          raycasterEl: #headCursor;
          muzzleEl: #headCursor;
          fireRate: 10;
          tracerMs: 120;
          bulletSpeed: 40;
          bulletRotOffset: 0 90 0;
          desktopMouse: true;
        "
        position="0.300 -0.207 -1.556"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <!-- Desktop gun only -->
      <a-entity
        id="dummy-hand-right"
        hide-in-vr
        obb-collider
        position="0.3 -0.4 -1.1"
      >
        <a-entity
          v-if="allAssetsLoaded"
          gltf-model="#gun"
          scale="0.0025 0.0025 0.0025"
          rotation="0 180 0"
          hide-in-vr
        ></a-entity>
      </a-entity>
    </a-entity>
    <a-entity id="hand-left" hand-controls="hand: left"></a-entity>

    <!-- VR right controller -->
    <a-entity
      id="hand-right"
      
      laser-controls="hand: right"
      raycaster="far: 50; objects: .clickable; showLine: true; lineColor: white;"
      cursor="fuse: false; rayOrigin: entity;"
      gun-fx="
          raycasterEl: #hand-right;
          muzzleEl: #hand-right;
          fireRate: 10;
          tracerMs: 120;
          bulletSpeed: 20;
          bulletRotOffset: 0 90 0;
          desktopMouse: false;
        "
    >
      <!-- Debug: si tu vois pas ça bouger avec la main, le contrôleur n'est pas détecté -->
      <a-box position="0 0 0.05" scale="0.04 0.02 0.12"></a-box>

      <!-- Gun VR (test direct, sans TheGun.vue) -->
      <a-entity position="0 -0.02 -0.06" rotation="45 0 0">
        <a-entity
          v-if="allAssetsLoaded"
          show-in-vr
          gltf-model="#gun"
          scale="0.0025 0.0025 0.0025"
          rotation="90 180 0"
        ></a-entity>
      </a-entity>
    </a-entity>
  </a-entity>
</template>
