<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/show-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/physx-grab.js";
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
      <!-- Curseur desktop uniquement -->
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 50; objects: [clickable]; showLine: false; lineColor: white; lineOpacity: 0.5;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <!-- Pistolet desktop -->
      <a-entity id="dummy-hand-right" obb-collider position="0.3 -0.4 -1.1" hide-in-vr>
        <TheGun v-if="allAssetsLoaded"></TheGun>
      </a-entity>

     <!-- <a-box
        id="dummy-hand-left"
        position="-0.3 -0.4 -0.5"
        obb-collider
        hide-in-vr
     ></a-box> -->  
    </a-entity>

    <!-- <a-entity id="hand-left" hand-controls="hand: left"></a-entity> -->

    <!-- Manette droite VR -->
    <a-entity
      id="hand-right"
      tracked-controls="hand: right"
      obb-collider
    >
      <TheGun v-if="allAssetsLoaded"></TheGun>
    </a-entity>
  </a-entity>
</template>