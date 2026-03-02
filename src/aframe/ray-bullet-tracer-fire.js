AFRAME.registerComponent("ray-bullet-tracer-fire", {
  schema: {
    marker: { type: "selector" },
    markerId: { type: "string", default: "bullet-tracer" },

    // Où placer la balle quand rien n'est touché
    distance: { type: "number", default: 2.0 },

    // Si true: colle au hit quand il existe
    snapToHit: { type: "boolean", default: true },

    // Offset (anti z-fighting) au hit
    hitOffset: { type: "number", default: 0.002 },

    // Oriente la balle dans le sens du rayon
    orientToRay: { type: "boolean", default: true },

    // Correction orientation du GLB (degrés)
    rotOffset: { type: "vec3", default: { x: 0, y: 0, z: 0 } },

    // Contrôle visibilité pendant tir
    visibleOnlyWhenFiring: { type: "boolean", default: true },

    // Desktop: écouter la souris sur window (true) ou pas (false)
    desktopMouse: { type: "boolean", default: true },
  },

  init() {
    this.isFiring = false;
    this.hasHit = false;
    this.hit = null;

    // Marker (créé si absent)
    this.markerEl = this.data.marker || document.querySelector(`#${this.data.markerId}`);
    if (!this.markerEl) {
      this.markerEl = document.createElement("a-entity");
      this.markerEl.setAttribute("id", this.data.markerId);

      // ✅ Remplace #bulletModel par ton asset (a-asset-item)
      this.markerEl.setAttribute("gltf-model", "#bulletModel");
      this.markerEl.setAttribute("scale", "0.02 0.02 0.02");

      this.el.sceneEl.appendChild(this.markerEl);
    }

    if (this.data.visibleOnlyWhenFiring) this.markerEl.setAttribute("visible", "false");

    // Reuse objects
    this._origin = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._pos = new THREE.Vector3();
    this._quat = new THREE.Quaternion();
    this._euler = new THREE.Euler();

    // Bind
    this._onIntersection = this._onIntersection.bind(this);
    this._onCleared = this._onCleared.bind(this);
    this._startFire = this._startFire.bind(this);
    this._stopFire = this._stopFire.bind(this);

    // Raycaster events
    this.el.addEventListener("raycaster-intersection", this._onIntersection);
    this.el.addEventListener("raycaster-intersection-cleared", this._onCleared);

    // VR controller events (très standard)
    this.el.addEventListener("triggerdown", this._startFire);
    this.el.addEventListener("triggerup", this._stopFire);

    // Desktop mouse (global)
    if (this.data.desktopMouse) {
      window.addEventListener("mousedown", this._startFire);
      window.addEventListener("mouseup", this._stopFire);
      window.addEventListener("blur", this._stopFire);
    }
  },

  remove() {
    this.el.removeEventListener("raycaster-intersection", this._onIntersection);
    this.el.removeEventListener("raycaster-intersection-cleared", this._onCleared);

    this.el.removeEventListener("triggerdown", this._startFire);
    this.el.removeEventListener("triggerup", this._stopFire);

    if (this.data.desktopMouse) {
      window.removeEventListener("mousedown", this._startFire);
      window.removeEventListener("mouseup", this._stopFire);
      window.removeEventListener("blur", this._stopFire);
    }
  },

  _startFire() {
    this.isFiring = true;
    if (this.data.visibleOnlyWhenFiring) this.markerEl.setAttribute("visible", "true");
  },

  _stopFire() {
    this.isFiring = false;
    if (this.data.visibleOnlyWhenFiring) this.markerEl.setAttribute("visible", "false");
  },

  _onIntersection(evt) {
    const list = evt.detail.intersections;
    if (!list || list.length === 0) return;
    this.hasHit = true;
    this.hit = list[0];
  },

  _onCleared() {
    this.hasHit = false;
    this.hit = null;
  },

  tick() {
    // ✅ La balle n'existe que pendant le tir
    if (!this.isFiring) return;

    const rc = this.el.components.raycaster;
    if (!rc || !rc.raycaster) return;

    const ray = rc.raycaster.ray;
    this._origin.copy(ray.origin);
    this._dir.copy(ray.direction).normalize();

    // Position
    if (this.data.snapToHit && this.hasHit && this.hit && this.hit.point) {
      this._pos.copy(this.hit.point);

      // Offset: normale si dispo, sinon direction du rayon
      if (this.hit.face && this.hit.face.normal) {
        const n = this.hit.face.normal.clone().transformDirection(this.hit.object.matrixWorld);
        this._pos.add(n.normalize().multiplyScalar(this.data.hitOffset));
      } else {
        this._pos.add(this._dir.clone().multiplyScalar(this.data.hitOffset));
      }
    } else {
      this._pos.copy(this._origin).add(this._dir.clone().multiplyScalar(this.data.distance));
    }

    this.markerEl.object3D.position.copy(this._pos);

    // Orientation vers direction du rayon + correction
    if (this.data.orientToRay) {
      const forward = new THREE.Vector3(0, 0, -1); // convention A-Frame/three
      this._quat.setFromUnitVectors(forward, this._dir);

      this._euler.set(
        THREE.MathUtils.degToRad(this.data.rotOffset.x),
        THREE.MathUtils.degToRad(this.data.rotOffset.y),
        THREE.MathUtils.degToRad(this.data.rotOffset.z),
        "YXZ"
      );
      const offsetQ = new THREE.Quaternion().setFromEuler(this._euler);

      this.markerEl.object3D.quaternion.copy(this._quat).multiply(offsetQ);
    }
  },
});