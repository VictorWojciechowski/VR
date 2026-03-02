AFRAME.registerComponent("skeleton-walker", {
  schema: {
    speed: { type: "number", default: 0.01
     },
    killDistance: { type: "number", default: 0.5 },
  },

  init: function () {
    this.playerPos = new THREE.Vector3(0, 0, 0);
    this.isGameOver = false;

    this.camera = document.querySelector('#head');

    this.onGameOver = this.onGameOver.bind(this);
    this.el.sceneEl.addEventListener("game-over", this.onGameOver);
  },

  onGameOver: function () {
    this.isGameOver = true;
  },

  tick: function (time, delta) {
    // Squelette supprimé par shooting-target
    if (!this.el.parentNode) return;
    if (this.isGameOver) return;

    if (this.camera) {
    this.camera.object3D.getWorldPosition(this.playerPos);
    this.playerPos.y = 0;
  }

    const pos = this.el.object3D.position;

    const direction = new THREE.Vector3(
      this.playerPos.x - pos.x,
      0,
      this.playerPos.z - pos.z,
    );

    const distance = direction.length();

    if (distance < this.data.killDistance) {
      this.el.sceneEl.emit("game-over");
      return;
    }

    direction.normalize();
    const move = (this.data.speed * delta) / 1000;
    this.el.setAttribute("position", {
      x: pos.x + direction.x * move,
      y: pos.y,
      z: pos.z + direction.z * move,
    });

    this.el.object3D.lookAt(this.playerPos);
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("game-over", this.onGameOver);
  },
});