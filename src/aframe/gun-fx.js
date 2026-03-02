AFRAME.registerComponent("gun-fx", {
  schema: {
    raycasterEl: { type: "selector" },
    muzzleEl: { type: "selector" },

    maxDistance: { type: "number", default: 50 },
    fireRate: { type: "number", default: 8 },

    tracerMs: { type: "number", default: 80 },
    bulletSpeed: { type: "number", default: 60 },

    bulletRotOffset: { type: "vec3", default: { x: 0, y: 90, z: 0 } },
    bulletScale: { type: "vec3", default: { x: 0.02, y: 0.02, z: 0.02 } },

    bulletModel: { type: "string", default: "#bulletModel" },
    poolSize: { type: "int", default: 12 },

    desktopMouse: { type: "boolean", default: true },
    snapToHit: { type: "boolean", default: true },
    impactOffset: { type: "number", default: 0.002 },

    shootablesSelector: { type: "string", default: ".shootable" },

    // ✅ perf: éviter querySelectorAll à chaque tir
    cacheShootablesMs: { type: "number", default: 1000 },

    // ✅ perf: remplacer bullet GLB par une primitive si true
    lowFx: { type: "boolean", default: false },
  },

  init() {
    const THREE = AFRAME.THREE;

    this._nextShotAt = 0;

    this.rayEl = this.data.raycasterEl || this.el;
    this.muzzleEl = this.data.muzzleEl || this.el;

    // Reuse vectors
    this._origin = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._tmp = new THREE.Vector3();

    // Bind (appelé depuis events)
    this._shootOnce = this._shootOnce.bind(this);

    // 1 balle par triggerdown
    this.el.addEventListener("triggerdown", this._shootOnce);

    // 1 balle par clic
    if (this.data.desktopMouse) {
      window.addEventListener("mousedown", this._shootOnce);
    }

    // Pools
    this._makePools();
    this._makeMuzzleFlash();

    // ✅ cache shootables (perf)
    this._shootableObjects = [];
    this._refreshShootables = this._refreshShootables.bind(this);
    this._refreshShootables();
    const ms = Math.max(0, this.data.cacheShootablesMs);
    this._shootablesTimer = ms > 0 ? setInterval(this._refreshShootables, ms) : null;
  },

  remove() {
    this.el.removeEventListener("triggerdown", this._shootOnce);

    if (this.data.desktopMouse) {
      window.removeEventListener("mousedown", this._shootOnce);
    }

    if (this._shootablesTimer) clearInterval(this._shootablesTimer);
  },

  tick() {},

  _refreshShootables() {
    const selector = this.data.shootablesSelector || ".shootable";
    const els = Array.from(this.el.sceneEl.querySelectorAll(selector));
    this._shootableObjects = els.map((e) => e.object3D).filter(Boolean);
  },

  _makePools() {
    this.scene = this.el.sceneEl;

    this.bullets = [];
    this.tracers = [];
    this.impacts = [];
    this._poolIdx = 0;

    for (let i = 0; i < this.data.poolSize; i++) {
      // Bullet
      const b = document.createElement("a-entity");
      b.setAttribute("visible", "false");

      if (this.data.lowFx) {
        // ✅ perf: bullet cheap
        b.setAttribute("geometry", "primitive: sphere; radius: 0.01");
        b.setAttribute("material", "shader: flat; color: #fff");
      } else {
        if (this.data.bulletModel) b.setAttribute("gltf-model", this.data.bulletModel);
        b.object3D.scale.set(
          this.data.bulletScale.x,
          this.data.bulletScale.y,
          this.data.bulletScale.z
        );
      }

      this.scene.appendChild(b);
      this.bullets.push(b);

      // Tracer
      const t = document.createElement("a-entity");
      t.setAttribute("visible", "false");
      t.setAttribute("geometry", "primitive: cylinder; radius: 0.002; height: 1");
      t.setAttribute("material", "shader: flat; color: #fff; opacity: 0.9; transparent: true");
      this.scene.appendChild(t);
      this.tracers.push(t);

      // Impact
      const im = document.createElement("a-entity");
      im.setAttribute("visible", "false");
      im.setAttribute("geometry", "primitive: sphere; radius: 0.01");
      im.setAttribute("material", "shader: flat; color: #fff; opacity: 0.9; transparent: true");
      this.scene.appendChild(im);
      this.impacts.push(im);
    }
  },

  _makeMuzzleFlash() {
    const mf = document.createElement("a-entity");
    mf.setAttribute("visible", "false");
    mf.setAttribute("geometry", "primitive: plane; height: 0.06; width: 0.06");
    mf.setAttribute("material", "shader: flat; color: #fff; opacity: 0.0; transparent: true");

    this.muzzleEl.appendChild(mf);
    this.muzzleFlash = mf;
  },

  _shootOnce(evtOrTime) {
    const now = typeof evtOrTime === "number" ? evtOrTime : performance.now();

    // cooldown anti double tir
    const intervalMs = 1000 / Math.max(1, this.data.fireRate);
    if (now < this._nextShotAt) return;
    this._nextShotAt = now + intervalMs;

    const THREE = AFRAME.THREE;

    const rc = this.rayEl?.components?.raycaster;
    if (!rc || !rc.raycaster) return;

    const ray = rc.raycaster.ray;

    // origine = world position du raycasterEl
    const start = new THREE.Vector3();
    this.rayEl.object3D.getWorldPosition(start);

    const dir = ray.direction.clone().normalize();

    const hit = this._raycastShootables(start, dir);

    const end = start.clone().add(dir.clone().multiplyScalar(this.data.maxDistance));

    if (this.data.snapToHit && hit) {
      end.copy(hit.point);
      end.add(dir.clone().multiplyScalar(this.data.impactOffset));
      hit.el.emit("shot-hit", { point: hit.point, shooter: this.el }, false);
    }

    // FX (tu peux couper en VR low si besoin)
    this._doMuzzleFlash(now);
    this._doTracer(start, end, now);
    this._doBullet(start, end, now);
    if (hit) this._doImpact(end, null, now);
  },

  _raycastShootables(origin, direction) {
    const THREE = AFRAME.THREE;

    const objects = this._shootableObjects;
    if (!objects || objects.length === 0) return null;

    const raycaster = new THREE.Raycaster(origin, direction, 0, this.data.maxDistance);
    const intersects = raycaster.intersectObjects(objects, true);
    if (!intersects || intersects.length === 0) return null;

    const i0 = intersects[0];
    let o = i0.object;
    while (o && !o.el) o = o.parent;

    const el = o?.el || null;
    if (!el) return null;

    return { el, point: i0.point, object: i0.object, distance: i0.distance };
  },

  _doMuzzleFlash() {
    const mf = this.muzzleFlash;
    if (!mf) return;

    mf.setAttribute("visible", "true");
    mf.removeAttribute("animation__in");
    mf.removeAttribute("animation__out");

    mf.setAttribute(
      "animation__in",
      "property: material.opacity; from: 0.0; to: 0.9; dur: 30; easing: easeOutQuad"
    );
    mf.setAttribute(
      "animation__out",
      "property: material.opacity; from: 0.9; to: 0.0; dur: 70; delay: 30; easing: easeInQuad"
    );

    setTimeout(() => mf.setAttribute("visible", "false"), 120);
  },

  _doTracer(start, end) {
    const THREE = AFRAME.THREE;

    const t = this.tracers[this._poolIdx % this.tracers.length];
    t.setAttribute("visible", "true");

    const mid = this._tmp.copy(start).add(end).multiplyScalar(0.5);
    t.object3D.position.copy(mid);

    const dist = start.distanceTo(end);
    t.setAttribute(
      "geometry",
      `primitive: cylinder; radius: 0.002; height: ${Math.max(0.001, dist)}`
    );

    const dir = end.clone().sub(start).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
    t.object3D.quaternion.copy(q);

    setTimeout(() => t.setAttribute("visible", "false"), this.data.tracerMs);
  },

  _doBullet(start, end) {
    const THREE = AFRAME.THREE;

    const b = this.bullets[this._poolIdx % this.bullets.length];
    b.setAttribute("visible", "true");

    const dir = end.clone().sub(start).normalize();
    const forward = new THREE.Vector3(0, 0, -1);
    const q = new THREE.Quaternion().setFromUnitVectors(forward, dir);

    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(this.data.bulletRotOffset.x),
      THREE.MathUtils.degToRad(this.data.bulletRotOffset.y),
      THREE.MathUtils.degToRad(this.data.bulletRotOffset.z),
      "YXZ"
    );
    const offsetQ = new THREE.Quaternion().setFromEuler(euler);

    b.object3D.quaternion.copy(q).multiply(offsetQ);
    b.object3D.position.copy(start);

    const dist = start.distanceTo(end);
    const dur = Math.max(30, (dist / Math.max(1, this.data.bulletSpeed)) * 1000);

    b.removeAttribute("animation__move");
    b.setAttribute(
      "animation__move",
      `property: position; to: ${end.x} ${end.y} ${end.z}; dur: ${dur}; easing: linear`
    );

    setTimeout(() => b.setAttribute("visible", "false"), dur + 10);
    this._poolIdx++;
  },

  _doImpact(pos) {
    const im = this.impacts[(this._poolIdx - 1) % this.impacts.length];
    im.setAttribute("visible", "true");
    im.object3D.position.copy(pos);

    im.removeAttribute("animation__s");
    im.removeAttribute("animation__o");

    im.setAttribute(
      "animation__s",
      "property: scale; from: 1 1 1; to: 2.5 2.5 2.5; dur: 120; easing: easeOutQuad"
    );
    im.setAttribute(
      "animation__o",
      "property: material.opacity; from: 0.9; to: 0.0; dur: 120; easing: easeInQuad"
    );

    setTimeout(() => im.setAttribute("visible", "false"), 140);
  },
});