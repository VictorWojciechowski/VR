<script setup>
import "../aframe/show-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/disable-in-desktop.js";
import "../aframe/event-set.js";
</script>

<template>
  <a-entity>
    <!-- Desktop -->
    <a-entity
      gltf-model="#gun"
      scale="0.0015 0.0015 0.0015"
      rotation="0 180 0"
      hide-in-vr
    ></a-entity>

    <!-- VR -->
    <a-entity
      gltf-model="#gun"
      scale="0.0005 0.0005 0.0005"
      rotation="40 180 0"
      show-in-vr
    ></a-entity>
    <a-entity
      raycaster="far: 50; objects: [clickable]; showLine: true; lineColor: white;"
      cursor="fuse: false; rayOrigin: entity;"
      rotation="-40 0 0"
      position="0 0 -0.2"
      event-set="event: componentdisabled; attribute: raycaster.showLine; value: false;"
      disable-in-desktop="component: raycaster;"
    ></a-entity>
  </a-entity>
</template>
